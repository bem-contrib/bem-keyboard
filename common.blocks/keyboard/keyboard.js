modules.define('keyboard', ['i-bem__dom', 'objects', 'jquery', 'next-tick'], function(provide, BEMDOM, objects, $, nextTick) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                var input = this.input = this.findBlockOn('input'),
                    layout = this.elem('layout').add(this.elem('space'));

                this.bindTo(layout, 'mousedown mouseup', function() {
                    nextTick(function() {
                        input.setMod('focused', true);
                    });
                });

                BEMDOM.blocks.button.on(layout, 'click', this.onButtonClick, this);
                BEMDOM.blocks.button.on(this.elem('symbols'), 'click', function(e) {
                    if (e.target.hasMod('checked')) {
                        this._prevLayout = this.getMod(this.elem('layout', 'current'), 'name');
                        this.switchLayout('symbols');
                    } else {
                        this.switchLayout(this._prevLayout);
                    }
                }, this);
                BEMDOM.blocks.select.on('change', this.onLayoutChange, this);

                this._shift = this.findBlocksInside({ block: 'button', modName: 'kind', modVal: 'shift' });
                this._capslock = this.findBlocksInside({ block: 'button', modName: 'kind', modVal: 'capslock' });
            }
        }
    },
    onButtonClick: function(e) {
        var button = e.target,
            kind = button.getMod('kind'),
            input = this.input,
            control = input.elem('control').get(0),
            isShift = kind === 'shift',
            isCaps = kind === 'capslock';

        if (isShift || isCaps) {
            this.toggleMod(kind, true);

            button.toggleMod('checked', true);

            var oppositeKind = isShift ? 'capslock' : 'shift';
            this.delMod(oppositeKind);

            this['_' + kind].forEach(function(btn) {
                btn.toggleMod('checked', true);
            });

            this['_' + oppositeKind].forEach(function(btn) {
                btn.delMod('checked');
            });

            return;
        }

        if (kind === 'enter') {
            var form = control.form;
            form && form.submit();
            return;
        }

        var caret = {
                start: control.selectionStart,
                end: control.selectionEnd,
            },
            keyValue = button.getText(),
            inputValue = input.getVal(),
            isBackspace = button.hasMod('kind', 'backspace'),
            pos = caret.start + 1;

        if (isBackspace) {
            keyValue = '';

            var isSelection = caret.end - caret.start;
            isSelection || caret.start--;

            pos = caret.start;
        }

        input.setVal(
            inputValue.substr(0, caret.start) + keyValue + inputValue.substr(caret.end)
        );

        control.setSelectionRange(pos, pos);

        if (!this.hasMod('capslock')) {
            this.delMod('shift');
            this._shift.forEach(function(btn) {
                btn.delMod('checked');
            });
        }
    },
    switchLayout: function(layout) {
        this.delMod(this.elem('layout', 'current'), 'current');
        this.setMod(this.elem('layout', 'name', layout), 'current', true);
    },
    onLayoutChange: function(e) {
        var select = e.target;

        this.findBlockOn(this.elem('symbols'), 'button').delMod('checked');

        this.switchLayout(select.getVal());
    }
}));

});
