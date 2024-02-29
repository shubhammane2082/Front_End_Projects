let presentIndex=1;

function showImage(index)
{
    let images=document.querySelectorAll('.image-last-part');

    //We are using this to hide all images
    images.forEach((image) =>{
        image.style.display='none';
    });
    
    images[index].style.display='block';

    const Content=document.getElementById(`content${index+1}`);
    Content.style.display='block';
}


    function prevImage() {
        presentIndex = (presentIndex - 1 + 2) % 2;
        showImage(presentIndex);
      }
  
      function nextImage(){
        presentIndex = (presentIndex + 1) % 2;
        showImage(presentIndex);
      }

