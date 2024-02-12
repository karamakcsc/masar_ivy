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



// ///////////Stop SO///////////////SIAM
// frappe.ui.form.on("Sales Order", {
//     before_submit: function (frm) {
//         StopSO(frm);
//     }
// });
frappe.ui.form.on("Sales Order", {
    before_submit: function (frm) {
        frappe.call({
            method: "masar_ivy.custom.sales_order.sales_order.get_reserved_qty",
            args: {
                name: frm.doc.name, 
                // item_code: item.item_code,
                // warehouse: frm.doc.set_warehouse
  
            }, 
            callback:function(r){
                if (r.message.value == 1){
                frappe.msgprint("STOP: Quantity should not exceed actual quantity " + r.message.code+".");
                    frappe.validated = false;
                    return false;
                }
                
            }
        });
    }
});

// function StopSO(frm) {
//     $.each(frm.doc.items || [], function (i, item) {
//         frappe.call({
//             method: "masar_ivy.custom.sales_order.sales_order.get_reserved_qty",
//             args: {
//                 name: frm.doc.name, 
//                 item_code: item.item_code,
//                 warehouse: frm.doc.set_warehouse
//                 // qty : item.qty , 
//                 // actual_qty : item.actual_qty
//             }
//         });
//     });
// }

// ///////////Stop SO///////////////SIAM

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
////////// filters selling price list 

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
//             if (r.message === false) {
//                 frappe.model.set_value(cdt, cdn, 'item_code', '');  
//             }
//            }
//         });
//     }
// });
//////////// mahmoud code to select item code 
////////// filters selling price list 


