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
