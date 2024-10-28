/*
 * This source file is available under two different licenses:
 *  - GNU General Public License version 3 (GPLv3)
 *  - Data Definitions Commercial License (DDCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) CORS GmbH (https://www.cors.gmbh) in combination with instride AG (https://www.instride.ch)
 * @license    GPLv3 and DDCL
 */

pimcore.registerNS('pimcore.plugin.datadefinitions.interpreters.nestedcontainer');

pimcore.plugin.datadefinitions.interpreters.nestedcontainer = Class.create({
    parent: {},
    data: {},
    interpreterItem: null,

    initialize: function (parent, type, interpreterItem) {
        this.parent = parent;
        this.type = type;
        this.interpreterItem = interpreterItem;
    },

    getLayout: function (type, fromColumn, toColumn, record, config) {
        var myId = Ext.id();

        this.layout = new Ext.panel.Panel({
            xparent: this,
            id: myId,
            style: 'margin: 10px 0 0 0',
            border: true,
            scrollable: true,
            maxHeight: 500,
            tbar: this.getTopBar(type, myId, this.parent, this.data),
            items: [{
                xtype: 'form',
                defaults: {anchor: '100%'},
                layout: 'form',
                items: this.interpreterItem.getLayout(fromColumn, toColumn, record, config)
            }]
        });

        return this.layout;
    },

    getValues: function () {
        if (Ext.isFunction(this.interpreterItem['getInterpreterData'])) {
            return this.interpreterItem.getInterpreterData();
        }

        return this.layout.down('form').getForm().getFieldValues();
    },

    getIndex: function (blockElement, container) {
        // detect index
        var index;

        for (var s = 0; s < container.items.items.length; s++) {
            if (container.items.items[s].getId() === blockElement.getId()) {
                index = s;
                break;
            }
        }

        return index;
    },

    /**
     * @param name
     * @param index
     * @param parent
     * @param data
     * @returns {Array}
     */
    getTopBar: function (name, index, parent, data) {
        var namespace = 'conditions';
        var container = parent.interpreterContainer;

        var items = [{
            xtype: 'tbtext',
            text: '<b>' + name + '</b>'
        }, '-', {
            iconCls: 'pimcore_icon_up',
            handler: function (blockId, parent, container, namespace) {

                var blockElement = Ext.getCmp(blockId);
                var index = pimcore.plugin.datadefinitions.interpreters.nestedcontainer.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                var newIndex = index - 1;
                if (newIndex < 0) {
                    newIndex = 0;
                }

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(newIndex, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();
            }.bind(window, index, parent, container, namespace),
            xtype: 'button'
        }, {
            iconCls: 'pimcore_icon_down',
            handler: function (blockId, parent, container, namespace) {

                var container = container;
                var blockElement = Ext.getCmp(blockId);
                var index = pimcore.plugin.datadefinitions.interpreters.nestedcontainer.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(index + 1, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();

            }.bind(window, index, parent, container, namespace),
            xtype: 'button'
        }];


        if (Ext.isFunction(this.getTopBarItems)) {
            items.push.apply(items, this.getTopBarItems());
        }

        items.push.apply(items, [
            '->', {
                iconCls: 'pimcore_icon_delete',
                handler: function (index, parent, container, namespace) {
                    container.remove(Ext.getCmp(index));
                }.bind(window, index, parent, container, namespace),
                xtype: 'button'
            }
        ]);

        return items;
    }
});
