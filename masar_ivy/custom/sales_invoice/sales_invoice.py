import frappe

@frappe.whitelist()
def create_jv(doc):
    try:
        if isinstance(doc, str):
            doc = frappe.parse_json(doc)

        jv = frappe.new_doc("Journal Entry")
        jv.posting_date = doc.get("posting_date")
        jv.company = doc.get("company")
        jv.cost_center = doc.get("accounts.cost_center")
        jv.cheque_no = doc.get("name")
        jv.cheque_date = doc.get("posting_date")
        jv.grand_total = doc.get("grand_total")
        jv.employee_id = doc.get("custom_employee_id")
        jv.customer = doc.get("customer")
        jv.employee_name = doc.get("custom_employee_name")
        jv.customer_name = doc.get("customer_name")
        jv.name = doc.get("name")
        jv.user_remark = f"Sales Invoice is: {doc.get('name')} in the Posting Date: {doc.get('posting_date')}"

        jv.append("accounts", {
            "account": "20101010002 - ذمم موردين دائنة - IVY",
            "debit_in_account_currency": jv.grand_total,
            "debit":jv.grand_total,
            "cost_center": jv.cost_center,
            "party_type": "Employee",
            "party": jv.employee_id,
            "party_name": jv.employee_name,
            # "reference_type": "Sales Invoice",
            # "reference_name": jv.name,
            # "reference_due_date": jv.posting_date,
            "user_remark": f"reference type is Sales Invoice, Reference Name is {jv.name} and Reference Due Date is: {doc.get('posting_date')}"
        })

        jv.append("accounts", {
            "account": "10104010002 - مبيعات الموظفين - IVY",
            "credit_in_account_currency": jv.grand_total,
            "credit":jv.grand_total,
            "cost_center": jv.cost_center,
            "party_type": "Customer",
            "party": jv.customer,
            "party_name":jv.customer_name,
            "reference_type": "Sales Invoice",
            "reference_name": jv.name,
            "reference_due_date": jv.posting_date,
            "user_remark": f"reference type is Sales Invoice, Reference Name is {jv.name} and Reference Due Date is: {doc.get('posting_date')}"
        })

        jv.insert(ignore_permissions=True)
        jv.submit()
        return (f"Journal Entries created for{doc.custom_employee_id} in Journal Entry")
    except Exception as e:
        frappe.log_error(f"Error creating journal entry: {str(e)}")
        return f"Error creating journal entry: {str(e)}"