frappe.ui.form.on("Sales Invoice","onload", function(frm) {
        var df=frappe.meta.get_docfield("Sales Invoice", "update_stock",frm.doc.name);
        df.read_only=1;
      frm.set_value('update_stock', 1);
      frm.set_value('set_warehouse', "Main Stock - IVY");
  });
  