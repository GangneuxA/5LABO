terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
    local = {
      source  = "hashicorp/local"
    }
  }
}

provider "docker" {
  host = "npipe:////./pipe/docker_engine" # For Windows
}

resource "docker_image" "mongo" {
  name = "mongo:latest"
}

resource "docker_network" "app_network" {
  name = "app_network"
}

resource "docker_container" "mongodb" {
  image = docker_image.mongo.image_id
  name  = "mongodb"
  ports {
    internal = 27017
    external = 27017
  }
  volumes {
    host_path      = "${abspath(path.module)}/mongo-data"
    container_path = "/data/db"
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
}

resource "docker_image" "backend" {
  name = "backend:latest"
  build {
    context = "${path.module}/../back"
  }
}

resource "docker_container" "backend" {
  image = docker_image.backend.image_id
  name  = "backend"
  ports {
    internal = 3010
    external = 3010
  }
  depends_on = [docker_container.mongodb]
  env = [
    "MONGODB_URI=mongodb://mongodb:27017/gpt",
    "JWT_Token=testscret"
  ]
  networks_advanced {
    name = docker_network.app_network.name
  }
}

resource "docker_image" "frontend" {
  name = "frontend:latest"
  build {
    context = "${path.module}/../front"
  }
}

resource "docker_container" "frontend" {
  image = docker_image.frontend.image_id
  name  = "frontend"
  ports {
    internal = 3000
    external = 3000
  }
  depends_on = [docker_container.backend]
  env = [
    "REACT_APP_API_URL=http://localhost:3010/api"
  ]
  healthcheck {
    test     = ["CMD", "curl", "-f", "http://localhost:3000"]
    interval = "30s"
    timeout  = "10s"
    retries  = 3
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
}

resource "docker_image" "nginx" {
  name = "nginx:latest"
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.image_id
  name  = "nginx"
  ports {
    internal = 80
    external = 80
  }
  ports {
    internal = 443
    external = 443
  }
  depends_on = [
    docker_container.backend,
    docker_container.frontend
  ]
  volumes {
    host_path      = "${abspath(path.module)}/../frontend.conf"
    container_path = "/etc/nginx/conf.d/default.conf"
  }
  restart = "always"
  networks_advanced {
    name = docker_network.app_network.name
  }
}
