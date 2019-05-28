"use strict";

/* Functions */
function leadZero(n) {
    return (n < 10 ? '0' : '') + n;
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function equalHeight(group) {
    if (jQuery(window).width() > '768') {
        var tallest = 0;
        jQuery(group).each(function () {
            var thisHeight = jQuery(this).css('height', '').outerHeight();
            if (thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        jQuery(group).css('height', tallest);
    } else {
        jQuery(group).css('height', '');
    }
}

jQuery(window).on('load', function () {
    jQuery('body').addClass('loaded');

    jQuery(window).trigger('resize').trigger('scroll');

    setTimeout(function () {
        jQuery(window).trigger('resize').trigger('scroll');
    }, 700)
});


jQuery(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
});


jQuery(document).ready(function () {

    /* Navigation Events */

    jQuery(document).on('click', '.nav-butter.hidden_menu', function () {
        if (jQuery(this).hasClass('active')) {
            jQuery(this).removeClass('active').parent().find('.navigation').removeClass('active');
        } else {
            jQuery(this).addClass('active').parent().find('.navigation').addClass('active');
        }
    }).on('click', '.mobile-navigation .menu-item-has-children > a', function (e) {
        e.preventDefault();

        jQuery(this).toggleClass('active').next('ul').slideToggle();
    }).on('click', '.nav-butter', function () {
        jQuery('.mobile-header').addClass('show');
    }).on('click', '.mobile-header .close', function () {
        jQuery('.mobile-header').removeClass('show');
    });

    /* Resize Events */

    jQuery(window).on('load resize', function () {
        var window_height = jQuery(window).height();

        jQuery('.full-height').css('height', window_height);

        jQuery('.main-container').css('min-height', window_height - jQuery('.header-space:visible').height() - jQuery('.site-footer').outerHeight())
    });

    /* Mobile Menu */

    jQuery('.navigation .menu-item-has-children > a').on("click", function () {
        if (jQuery(window).width() < 992) {
            if (!jQuery(this).hasClass('current')) {
                jQuery(this).addClass('current').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
                return false;
            }
        }
    });

    /* Focus on Input */

    jQuery('.input-row input.style1, .input-row textarea.style1').on('focusin', function () {
        jQuery(this).parents('.input-row').addClass('focus');
    }).on('focusout', function () {
        if (!jQuery(this).val()) {
            jQuery(this).parents('.input-row').removeClass('focus').addClass('focusout').delay(450).queue(function (next) {
                jQuery(this).removeClass('focusout');
                next();
            });
        }
    }).each(function () {
        if (jQuery(this).val()) {
            jQuery(this).parents('.input-row').addClass('focus');
        }
    });

    /* Scroll Events */

    jQuery(window).on('load scroll', function () {
        var scroll_top = jQuery(window).scrollTop(),
            window_height = jQuery(window).height();

        if (scroll_top > 30) {
            jQuery('.site-header').addClass('fixed');
        } else {
            jQuery('.site-header').removeClass('fixed');
        }

        jQuery('.main-contianer').css('height', window_height);

        var y = scroll_top + jQuery(window).height();
        jQuery('[data-parallax-coef]').each(function () {
            var coef = jQuery(this).attr('data-parallax-coef');
            var ey = (y - jQuery(this).offset().top) * coef;
            jQuery(this).css({
                'transform': 'translate3d( 0, ' + ey + 'px, 0 )'
            })
        });
    });

    /* Input Field */

    jQuery('.upload-input [type="file"]').on('change', function () {
        var file_name = jQuery(this).val().split(/\\|\//).pop();
        // console.log(file_name);
        jQuery(this).parents('.upload-input').find('input.style1').val(file_name);
    });

    /* Select2 */

    jQuery('select.style1').select2({
        minimumResultsForSearch: -1
    });

    /* Instargam Carousel */

    var $instargam_carousel = new Swiper('.instagram-carousel .swiper-container', {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            640: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            }
        },
        navigation: {
            prevEl: '.instagram-carousel .prev',
            nextEl: '.instagram-carousel .next',
        },
    });

    /* Brand Carousel */

    var $brand_carousel = new Swiper('.brand-carousel .swiper-container', {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            640: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            }
        },
        navigation: {
            prevEl: '.instagram-carousel .prev',
            nextEl: '.instagram-carousel .next',
        },
    });

    /* Product Image Slider */

    var $product_images = jQuery('.product-images');

    var $pi_thumbs = new Swiper($product_images.find('.pi-thumbs .swiper-container'), {
        slidesPerView: 3,
        spaceBetween: 30,
        watchSlidesVisibility: true,
        allowSlideNext: false,
        navigation: {
            nextEl: $product_images.find('.next'),
            prevEl: $product_images.find('.prev'),
        },
        on: {}
    });

    var $pi_slider = new Swiper($product_images.find('.pi-slider .swiper-container'), {
        effect: 'fade',
        thumbs: {
            swiper: $pi_thumbs
        },
        pagination: {
            el: $product_images.find('.pagination'),
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            768: {
                //effect: 'slide',
            }
        }
    });

    /* Tabs */

    var $tabs_block = jQuery('.tabs-block');

    var $tabs_head = new Swiper($tabs_block.find('.tabs-head'), {
        slidesPerView: 2,
        watchSlidesVisibility: true,
        allowTouchMove: false,
    });

    var $tabs_body = new Swiper($tabs_block.find('.tabs-body'), {
        allowTouchMove: false,
        thumbs: {
            swiper: $tabs_head
        }
    });

    /* Load Animations */

    function animations() {
        jQuery('.animate').each(function () {
            var animation = jQuery(this).attr('data-animation');

            var top = jQuery(document).scrollTop() + jQuery(window).height();
            var pos_top = jQuery(this).offset().top;
            if (top > pos_top) {
                jQuery(this).addClass('animated ' + animation);
            }
        });
    }

    jQuery(window).on('load scroll', function () {
        animations();
    });
});




//        валидация прикрепленных файлов и отображение миниатюр

var FILE_TYPES = ['jpg', 'jpeg', 'png'];
var UPLOAD_INPUT_CONTAINER = document.querySelector('.upload-input');
var ERROR_MSG_CONTAINER = document.querySelector('.file-size');
var MAX_SIZE_IMG = 5242880;
var PREVIEW_CONTAINER = document.querySelector('.uploaded-files');
var FILE_FIELD = document.querySelector('.select-file-wrap');
var loadFile;
var previewImage;

function pastInput() {
    previewImage.appendChild(loadFile);
    PREVIEW_CONTAINER.appendChild(previewImage);
};

function removeFile(event) {
    event.explicitOriginalTarget.parentElement.remove()
};

function showErr(msg) {
    UPLOAD_INPUT_CONTAINER.classList.add('error');
    ERROR_MSG_CONTAINER.innerHTML = msg;
    ERROR_MSG_CONTAINER.classList.add('error-text');
}

function checkFileType(file, types) {
    for (var i = 0; i < types.length; i++) {
        if (file.toLowerCase() === types[i].toLowerCase()){
            return true
        }
    }
}

function onChangeInputFile(evt) {
    var reader = new FileReader();
    var link = document.createElement('a');
    var img = document.createElement('img');
    var del = document.createElement('span');
    var deleteText = document.createTextNode('Удалить');
    var fileSize = evt.target.files[0].size;
    var fileNameArr = evt.target.files[0].name.split('.').pop();

    if ( fileSize > MAX_SIZE_IMG) {
        showErr('Файл более 5 МБ');
        return;
    } else if (!checkFileType(fileNameArr, FILE_TYPES)) {
        showErr('Не верный формат файла');
        return;
    }
    reader.onload = function (event) {
        link.setAttribute('class', 'item');
        img.setAttribute('class', 'thumb');
        img.setAttribute('src', event.target.result);
        del.setAttribute('class', 'delete');
        del.appendChild(deleteText);
        del.addEventListener('click', removeFile)

        link.appendChild(img);
        link.appendChild(del);

        previewImage = link;
        pastInput();
        PREVIEW_CONTAINER.style.display = 'flex';
    };
    reader.readAsDataURL(evt.target.files[0]);
}

function createInputTypeFile() {
    var input = document.createElement('input');
    input.style = 'display: none';
    input.setAttribute('type', 'file');
    input.addEventListener('change', onChangeInputFile);
    input.click();
    loadFile = input;
}

FILE_FIELD.addEventListener('click', function (event) {
    createInputTypeFile();
}, false);

