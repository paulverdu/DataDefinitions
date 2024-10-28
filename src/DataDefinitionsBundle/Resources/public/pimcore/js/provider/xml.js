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

pimcore.registerNS('pimcore.plugin.datadefinitions.provider.xml');

pimcore.plugin.datadefinitions.provider.xml = Class.create(pimcore.plugin.datadefinitions.provider.abstractprovider, {
    getItems: function () {
        return [{
            xtype: 'textfield',
            name: 'xPath',
            fieldLabel: t('data_definitions_xml_xpath'),
            anchor: '100%',
            value: this.data['xPath'] ? this.data.xPath : ''
        }, {
            xtype: 'textfield',
            name: 'exampleXPath',
            fieldLabel: t('data_definitions_xml_exampleXPath'),
            anchor: '100%',
            value: this.data['exampleXPath'] ? this.data.exampleXPath : ''
        }, {
            fieldLabel: t('data_definitions_xml_file'),
            name: 'exampleFile',
            cls: 'input_drop_target',
            value: this.data['exampleFile'] ? this.data.exampleFile : '',
            xtype: 'textfield',
            listeners: {
                render: function (el) {
                    new Ext.dd.DropZone(el.getEl(), {
                        reference: this,
                        ddGroup: 'element',
                        getTargetFromEvent: function (e) {
                            return this.getEl();
                        }.bind(el),

                        onNodeOver: function (target, dd, e, data) {
                            data = data.records[0].data;

                            if (data.elementType == 'asset') {
                                return Ext.dd.DropZone.prototype.dropAllowed;
                            }

                            return Ext.dd.DropZone.prototype.dropNotAllowed;
                        },

                        onNodeDrop: function (target, dd, e, data) {
                            data = data.records[0].data;

                            if (data.elementType == 'asset') {
                                this.setValue(data.id);
                                return true;
                            }

                            return false;
                        }.bind(el)
                    });
                }
            }
        }];
    }
});
