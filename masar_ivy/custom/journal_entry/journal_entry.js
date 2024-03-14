frappe.ui.form.on("Journal Entry","voucher_type", function(frm) {
    if (frm.doc.voucher_type == "Credit Note"){
      frm.set_value('naming_series', 'ACC-CN-.YYYY.-')
      frm.refresh_fields();
    }
    else {
      frm.set_value('naming_series', 'ACC-JV-.YYYY.-')
      frm.refresh_fields();
    }
    });

    frappe.ui.form.on("Journal Entry",{ before_load:function(frm) {
      var df=frappe.meta.get_docfield("Journal Entry", "naming_series",frm.doc.name);
      df.read_only=1;
    frm.refresh_fields();
    }
    });


 

  
frappe.ui.form.on('Journal Entry Account', {
  party: function(frm, cdt, cdn) {
      var child = locals[cdt][cdn];
      frappe.call({
          method: "masar_ivy.custom.journal_entry.journal_entry.fetch_party_name",
          args: {
            party_type: child.party_type,  
            party: child.party
          },
          callback: function(r) {
              if (r.message) {
                  frappe.model.set_value(cdt, cdn, "party_name", r.message);
              }
          }
      });
  }
});
