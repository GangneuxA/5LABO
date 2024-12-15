output "mongodb_container_id" {
  value = docker_container.mongodb.id
}

output "nginx_container_id" {
  value = docker_container.nginx.id
}

// Define other outputs as needed
// ...
