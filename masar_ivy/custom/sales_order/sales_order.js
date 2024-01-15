frappe.ui.form.on("Sales Order", {
    onload: function(frm) {
        ReserveStockField(frm);
    },

    refresh: function(frm) {
        ReserveStockField(frm);
    },

    after_save: function(frm) {
        ReserveStockField(frm);
    }
});

function ReserveStockField(frm) {
    var df = frappe.meta.get_docfield("Sales Order", "reserve_stock", frm.doc.name);
    df.read_only = 1;
    frm.set_value('reserve_stock', 1);
    frm.set_value('set_warehouse', "Main Stock - IVY");
    // frm.toggle_display("order_type", false);
}



///////////Stop SO///////////////SIAM
frappe.ui.form.on("Sales Order", {
    before_submit: function (frm) {
        StopSO(frm);
    }
});

function StopSO(frm) {
    $.each(frm.doc.items || [], function (i, item) {
        frappe.call({
            method: "masar_ivy.custom.sales_order.sales_order.get_reserved_qty",
            args: {
                item_code: item.item_code,
                warehouse: frm.doc.set_warehouse
            },
            async: false,
            callback: function (r) {
                if (r.message && item.qty > item.actual_qty + r.message) {
                    frappe.msgprint(__("STOP: Quantity should not exceed actual quantity."));
                    frappe.validated = false;
                    return false;
                }
            }
        });
    });
}

frappe.ui.form.on("Sales Order", {
    setup: function(frm) {
        frm.set_query("item_code", function() {
            return {
                filters: {
                    "is_sales_item": 1,
                    "has_variants": 0
                }
            };
        });
    }
});


//////////// mahmoud code to select item code 

// frappe.ui.form.on('Sales Order', {
//     selling_price_list: function (frm) {
//         frm.set_query('item_code', 'items', function (doc, cdt, cdn) {
//             return {
//                 query: 'masar_ivy.custom.sales_order.sales_order.select_item',
//                 filters: {
//                     'selling_price_list': doc.selling_price_list
//                 }
//             };
//         });
//     }
// });

// frappe.ui.form.on('Sales Order Item' , {
//     item_code :  function (frm, cdt, cdn){
//         var d = locals[cdt][cdn];
//         frappe.call({
//            method :  'masar_ivy.custom.sales_order.sales_order.check_item' , 
//            args :{
//             item_code :d.item_code, 
//             selling_price_list : frm.doc.selling_price_list
//            }, 
//            callback : function(r){
//             frappe.msgprint(r.message); 
//            }
//         });
//     }
// });




// frappe.ui.form.on('Sales Order Item', {
//     item_code: function (frm, cdt, cdn) {
//         var d = locals[cdt][cdn];
//         // if (d.item_code) {
//             frappe.call({
//                 method: 'masar_ivy.custom.sales_order.sales_order.select_item',
//                 args: {
//                     doctype: 'Sales Order',
//                     txt: d.item_code,
//                     searchfield: 'item_code',
//                     start: 0,
//                     page_len: 10,
//                     filters: {
//                         'selling_price_list': frm.doc.selling_price_list
//                     }
//                 },
//                 callback: function (r) {
//                     if (r.message.length === 0) {
//                         frappe.msgprint(__('Item not found in the selected price list.'));
//                         cur_frm.fields_dict.items.get_query = function (doc, cdt, cdn) {
//                             return {
//                                 filters: [
//                                     ['item_code', 'in', []] 
//                                 ]
//                             };
//                         };
//                     } else {
//                         // cur_frm.fields_dict.items.get_query = null;  
//                         frappe.msgprint(__((r.message)));
//                     }
//                 }
//             });
//         }
    
// });


// frappe.ui.form.on('Sales Order Item', {
//     item_code: function (frm, cdt, cdn) {
//         var d = locals[cdt][cdn];
//         if (d.item_code) {
//             frappe.call({
//                 method: 'masar_ivy.custom.sales_order.sales_order.select_item',
//                 args: {
//                     doctype: 'Sales Order',
//                     txt: d.item_code,
//                     searchfield: 'item_code',
//                     start: 0,
//                     page_len: 10,
//                     filters: {
//                         'selling_price_list': frm.doc.selling_price_list
//                     }
//                 },
//                 callback: function (r) {
//                     if (r.message) {
//                         if (Array.isArray(r.message) && r.message.length > 0) {
//                             // Access the first item in the result list
//                             var firstItem = r.message[0].item_code;
//                             console.log('First Item Code:', firstItem);

//                             // Reset the filter
//                             cur_frm.fields_dict.items.get_query = null;
//                         } else {
//                             frappe.msgprint(__('Item not found in the selected price list.'));
//                             // Set a filter to ensure no items are shown
//                             cur_frm.fields_dict.items.get_query = function (doc, cdt, cdn) {
//                                 return {
//                                     filters: [
//                                         ['item_code', 'in', []]
//                                     ]
//                                 };
//                             };
//                         }
//                     }
//                 }
//             });
//         }
//     }
// });
