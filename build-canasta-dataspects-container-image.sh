IMAGENAME=canasta-dataspects:1.2.0

echo "Building Docker image $IMAGENAME"
sudo docker build -t dataspects/$IMAGENAME .

# sudo docker login
# sudo docker push dataspects/$IMAGENAME