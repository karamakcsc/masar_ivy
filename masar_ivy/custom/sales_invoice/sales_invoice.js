frappe.ui.form.on("Sales Invoice","onload", function(frm) {
        var df=frappe.meta.get_docfield("Sales Invoice", "update_stock",frm.doc.name);
        df.read_only=1;
        var df=frappe.meta.get_docfield("Sales Invoice", "naming_series",frm.doc.name);
        df.read_only=1;
      frm.set_value('update_stock', 1);
      frm.set_value('set_warehouse', "Main Stock - IVY");
  });
// frappe.ui.form.on("Sales Invoice","onload", function(frm) {
//   // if (!frappe.user.has_role('Sales Manager')) {
//         var df=frappe.meta.get_docfield("Sales Invoice", "update_stock",frm.doc.name);
//         df.read_only=1;
//       frm.set_value('update_stock', 1);
//       frm.set_value('set_warehouse', "Main Stock - IVY");
//   // }
//   });

frappe.ui.form.on("Sales Invoice", {
  onload: function (frm) {
    if (frm.doc.is_return ==1) {
      frm.set_value('naming_series', 'ACC-SINV-RET-.YYYY.-');
      frm.set_value('set_warehouse', "Main Stock - IVY");
      var df=frappe.meta.get_docfield("Sales Invoice", "set_warehouse",frm.doc.name);
      df.read_only=1;
  }
  else {
    frm.set_value('naming_series', 'ACC-SINV-.YYYY.-')
    frm.set_value('set_warehouse', "Main Stock - IVY");
     }
     refresh_field("naming_series");
     refresh_field("set_warehouse");
  },
  is_return: function (frm) {
    if (frm.doc.is_return ==1) {
      frm.set_value('naming_series', 'ACC-SINV-RET-.YYYY.-');
      frm.set_value('set_warehouse', "Main Stock - IVY");
      var df=frappe.meta.get_docfield("Sales Invoice", "set_warehouse",frm.doc.name);
      df.read_only=1;
  }
  else {
    frm.set_value('naming_series', 'ACC-SINV-.YYYY.-')
    frm.set_value('set_warehouse', "Main Stock - IVY");
     }
    refresh_field("naming_series");
    refresh_field("set_warehouse");
  },
  refresh: function (frm) {
    if (frm.doc.is_return ==1) {
      frm.set_value('naming_series', 'ACC-SINV-RET-.YYYY.-');
      frm.set_value('set_warehouse', "Main Stock - IVY");
      var df=frappe.meta.get_docfield("Sales Invoice", "set_warehouse",frm.doc.name);
      df.read_only=1;
  }
  else {
    frm.set_value('naming_series', 'ACC-SINV-.YYYY.-')
    frm.set_value('set_warehouse', "Main Stock - IVY");
     }
    refresh_field("naming_series");
    refresh_field("set_warehouse");
  }
});