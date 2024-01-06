frappe.ui.form.on("Sales Invoice","onload", function(frm) {
  // if (!frappe.user.has_role('Sales Manager')) {
        var df=frappe.meta.get_docfield("Sales Invoice", "update_stock",frm.doc.name);
        df.read_only=1;
      frm.set_value('update_stock', 1);
      frm.set_value('set_warehouse', "Main Stock - IVY");
  // }
  });