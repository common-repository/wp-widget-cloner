(function ($) {
    'use strict';

    if (!window.Cloner) window.Cloner = {};

    Cloner.CloneWidgets = {
        Start: function () {
            $('body').on('click', '.widget-control-actions .clone-it', Cloner.CloneWidgets.Clone);
            Cloner.CloneWidgets.Bind();
        },

        Bind: function () {
            $('#widgets-right').off('DOMSubtreeModified', Cloner.CloneWidgets.Bind);
            $('.widget-control-actions:not(.cloner-cloneable)').each(function () {
                var $widget_block = $(this);

                var $clone = $('<a>');
                var clone = $clone.get()[0];
                $clone.addClass('clone-it cloner-clone-action')
                    .attr('title', 'Clone it')
                    .attr('href', '#')
                    .html('Clone it');


                $widget_block.addClass('cloner-cloneable');
                $clone.insertAfter($widget_block.find('.alignleft .widget-control-remove'));

                //Separator |
                clone.insertAdjacentHTML('beforebegin', ' | ');
            });

            $('#widgets-right').on('DOMSubtreeModified', Cloner.CloneWidgets.Bind);
        },

        Clone: function (ev) {
            var $original = $(this).parents('.widget');
            var $widget_block = $original.clone();

            // Find this widget's ID base. Find its number, duplicate.
            var id_base = $widget_block.find('input[name="id_base"]').val();
            var number = $widget_block.find('input[name="widget_number"]').val();
            var mnumber = $widget_block.find('input[name="multi_number"]').val();
            var highest = 0;

            $('input.widget-id[value|="' + id_base + '"]').each(function () {
                var match = this.value.match(/-(\d+)$/);
                if (match && parseInt(match[1]) > highest)
                    highest = parseInt(match[1]);
            });

            var new_num = highest + 1;

            $widget_block.find('.widget-content').find('input,select,textarea').each(function () {
                if ($(this).attr('name'))
                    $(this).attr('name', $(this).attr('name').replace(number, new_num));
            });

            // assign a unique id to this widget:
            var highest = 0;
            $('.widget').each(function () {
                var match = this.id.match(/^widget-(\d+)/);

                if (match && parseInt(match[1]) > highest)
                    highest = parseInt(match[1]);
            });
            var newid = highest + 1;

            // Figure out the value of add_new from the source widget:
            var add = $('#widget-list .id_base[value="' + id_base + '"]').siblings('.add_new').val();
            $widget_block[0].id = 'widget-' + newid + '_' + id_base + '-' + new_num;
            $widget_block.find('input.widget-id').val(id_base + '-' + new_num);
            $widget_block.find('input.widget_number').val(new_num);
            $widget_block.hide();
            $original.after($widget_block);
            $widget_block.fadeIn();

            // Not exactly sure what multi_number is used for.
            $widget_block.find('.multi_number').val(new_num);

            wpWidgets.save($widget_block, 0, 0, 1);

            ev.stopPropagation();
            ev.preventDefault();
        }
    }

    $(Cloner.CloneWidgets.Start);

})(jQuery);
