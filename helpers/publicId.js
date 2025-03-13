const getPublicIdFromUrl = (url) => {
    const regex = /upload\/v\d+\/(.+?)\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  
  module.exports = { getPublicIdFromUrl }