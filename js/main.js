$(document).ready(function() {
    
    var wrapBoxGallery = $("#wrapBoxGallery");
    //get gallery
    $.ajax({
        url: "https://api.dealermade.com/v3/dealerships/hare-chevrolet/vehicles/1FTFW1ET8DKF64586",
        type: "get",
        dataType: 'json'
    }).done(function (result){
        if(result.vehicle_pictures){
            result.vehicle_pictures.forEach(function(item, index, arr){
                url_image_preview = item.url.replace(item.filename, "preview_" + item.filename);
                url_image_main = item.url.replace(item.filename, "large_" + item.filename);
                itemImg = '<a class="picItem" rel="gallery" href="' + url_image_main +'" title="' + result.body + '"> <img src=" ' + url_image_preview + '" alt="' +  item.filename + '" /></a>';
                wrapBoxGallery.append(itemImg);
            });
            $("#wrapBoxGallery .picItem").fancybox({
                openEffect	: 'none',
                closeEffect	: 'none'
            });
        }
    });
});