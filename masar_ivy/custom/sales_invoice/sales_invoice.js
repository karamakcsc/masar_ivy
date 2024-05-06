frappe.ui.form.on("Sales Invoice","onload", function(frm) {
  if (!frappe.user.has_role('Update Stock - IVY') && frm.doc.docstatus !=1){
        var df=frappe.meta.get_docfield("Sales Invoice", "update_stock",frm.doc.name);
        df.read_only=1;
        var df=frappe.meta.get_docfield("Sales Invoice", "naming_series",frm.doc.name);
        df.read_only=1;
      frm.set_value('update_stock', 1);
      frm.set_value('set_warehouse', "Main Stock - IVY");
  }
  });

frappe.ui.form.on("Sales Invoice","onload", function(frm) {
  if (frappe.user.has_role('Update Stock - IVY') && frm.doc.docstatus !=1){
        var df=frappe.meta.get_docfield("Sales Invoice", "update_stock",frm.doc.name);
        df.read_only=0;
      frm.set_value('update_stock', 1);
      frm.set_value('set_warehouse', "Main Stock - IVY");
  }
  });

  frappe.ui.form.on("Sales Invoice", {
    onload: function (frm) {
        setValues(frm);
    },
    is_return: function (frm) {
        setValues(frm);
    },
    refresh: function (frm) {
        setValues(frm);
    },
});

function setValues(frm) {
  if (frm.doc.docstatus ==0) {
      if (frm.doc.is_return == 1) {
          frm.set_value('naming_series', 'ACC-SINV-RET-.YYYY.-');
          frm.set_value('set_warehouse', "Main Stock - IVY");
          frm.set_df_property('set_warehouse', 'read_only', true);
      } else {
          frm.set_value('naming_series', 'ACC-SINV-.YYYY.-');
          frm.set_value('set_warehouse', "Main Stock - IVY");
          frm.set_df_property('set_warehouse', 'read_only', false);
      }
  } else if(frm.doc.docstatus ==0) {
      frm.set_value('naming_series', 'ACC-SINV-.YYYY.-');
      frm.set_value('set_warehouse', "Main Stock - IVY");
      frm.set_df_property('set_warehouse', 'read_only', false);
  }
  
  frm.refresh_fields(["naming_series", "set_warehouse"]);
}


frappe.ui.form.on('Sales Invoice', {
    on_submit: function(frm) {
        if(frm.doc.customer_group == "Employees"){
        frappe.call({
            method: "masar_ivy.custom.sales_invoice.sales_invoice.create_jv",
            args: {
                doc: frm.doc
            },
            callback: function(r) {   
                console.log(r.message);
                frappe.msgprint(r.message);   
            }
        });
    }
    }
});
frappe.ui.form.on('Sales Invoice', {
    tax_category: function(frm) {
        updateIncomeAccount(frm);
    },
    taxes_and_charges: function(frm) {
        updateIncomeAccount(frm);
    },
    validate: function(frm) {
        updateIncomeAccount(frm);
    }
});
function updateIncomeAccount(frm) {
    frappe.call({
        method: "masar_ivy.custom.sales_invoice.sales_invoice.tax_free_sales",
        args:{
            tax_category: frm.doc.tax_category,
            taxes_and_charges: frm.doc.taxes_and_charges
        },
        callback: function(r) {
            frm.doc.items.forEach(function(row) {
                frappe.model.set_value(row.doctype, row.name, "income_account", r.message);
            });
            frm.refresh_fields();
        }
    });
}

