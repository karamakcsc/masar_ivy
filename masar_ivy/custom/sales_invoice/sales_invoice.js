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
      frm.set_value('update_stock', 0);
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


