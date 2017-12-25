(function () {
    $(document).ready(function () {

        $('#search').submit(function (e) {
            let tag = $(this).serialize();
            $(".grid").empty();
            e.preventDefault();
            $.ajax({
                url: '/',
                type: 'POST',
                data: tag
            }).done(function (data) {
                $('.grid').append(data)
            })
        });

        $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        })
    });
})();