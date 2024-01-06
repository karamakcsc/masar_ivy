frappe.ui.form.on("Sales Order", {
    onload: function(frm) {
        ReserveStockField(frm);
        SalesOrderType(frm);
    },

    refresh: function(frm) {
        ReserveStockField(frm);
        SalesOrderType(frm);
    },

    after_save: function(frm) {
        ReserveStockField(frm);
        SalesOrderType(frm);
    },

    custom_sales_order_type: function(frm) {
        SalesOrderType(frm);
    },
});

function ReserveStockField(frm) {
    var df = frappe.meta.get_docfield("Sales Order", "reserve_stock", frm.doc.name);
    df.read_only = 1;
    frm.set_value('reserve_stock', 1);
    frm.set_value('set_warehouse', "Main Stock - IVY");
    frm.toggle_display("order_type", false);
}

function SalesOrderType(frm) {
    var df = frappe.meta.get_docfield("Sales Order", "order_type", frm.doc.name);
    df.read_only = 1; 
    if (frm.doc.custom_sales_order_type == "Sales" || frm.doc.custom_sales_order_type == "Maintenance" || frm.doc.custom_sales_order_type == "Shopping Cart"){
    frm.set_value('order_type', frm.doc.custom_sales_order_type);
    }
    else {
        frm.set_value('order_type', "Sales");
    }
}



// frappe.ui.form.on("Sales Order", {
//     customer: function(frm) {
//         insertpricelist(frm);
//     },
//     before_save: function(frm) {
//         insertpricelist(frm);
//     },
//     onload: function(frm) {
//         insertpricelist(frm);
//     }
// });

// function insertpricelist(frm) {
//     $.each(frm.doc.items || [], function(i, item) {
//         if (item.item_code) {
//             item.custom_price_list = frm.doc.selling_price_list;
//         }
//     });
//     refresh_field("items");
// }



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
