(function ($) {
    $(document).ready(function () {

        $('#search').submit(function (e) {
            let values = $(this).serialize();
            e.preventDefault();
            $.ajax({
                url: 'localhost:3000/',
                type: 'POST',
                data: values
            }).done(function (arg) {
                alert(arg);
                console.log('hello')
            })
        });
    });
})();