$(document).ready(function() {
    
    var wrapBoxGallery = $("#wrapBoxGallery");
    var paginate = new Object();
    paginate.page_limit = 12;
    paginate.total_item = 0;
    paginate.offset = 1;
    paginate.is_paginate = 1;

    getDataImages(0);

    $("body").on('click', '.pagination > li > a', function(e){
        e.preventDefault();
        var attr_index = parseInt($(this).attr('data-index'));
        if (typeof attr_index !== typeof undefined && attr_index !== false) {
            if(paginate.page_limit * attr_index <= paginate.total_item) {
                paginate.offset = attr_index + 1;
                getDataImages(paginate.page_limit * attr_index)
            }
        }
    });

    function getDataImages(item_from) { console.log(item_from); console.log(paginate.offset  * paginate.page_limit);
        //get gallery
        $.ajax({
            url: "https://api.dealermade.com/v3/dealerships/hare-chevrolet/vehicles/1FTFW1ET8DKF64586",
            type: "get",
            dataType: 'json'
        }).done(function (result) {
            if (result.vehicle_pictures) {
                paginate.total_item = result.vehicle_pictures.length;
                //reset
                $("#wrapBoxGallery").empty();
                result.vehicle_pictures.forEach(function (item, index, arr) {
                    if(index >= paginate.offset  * paginate.page_limit)
                        return;
                    if(index >= item_from) {
                        url_image_preview = item.url.replace(item.filename, "preview_" + item.filename);
                        url_image_main = item.url.replace(item.filename, "large_" + item.filename);
                        itemImg = '<a class="picItem" rel="gallery" href="' + url_image_main + '" title="' + result.body + '"> <img src=" ' + url_image_preview + '" alt="' + item.filename + '" /></a>';
                        wrapBoxGallery.append(itemImg);
                    }
                });
                $("#wrapBoxGallery .picItem").fancybox({
                    openEffect: 'none',
                    closeEffect: 'none',
                });

                string_paginate = makePaging(paginate.total_item, paginate.offset - 1);
                $(".pagination").html(string_paginate);
            }
        });

        function makePaging(totalPages, pageIndex) {
            numPages = Math.ceil(totalPages/paginate.page_limit);
            pagingControls = '';
            for (var i = 1; i <= numPages; i++) {
                if (i != pageIndex + 1) {
                    pagingControls += '<li><a href="#" data-index="' + (i -1)  + '">' + i + '</a></li>';
                } else {
                    pagingControls += '<li><a class="active">' + i + '</a></li>';
                }
            }
            return pagingControls;
        }
    }
});