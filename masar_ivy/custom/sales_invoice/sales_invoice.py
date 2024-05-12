import frappe



def on_submit(self , method):
    pass
    # check_zero_qty_for_items(self)    
    


@frappe.whitelist()
def create_jv(doc):
    try:
        if isinstance(doc, str):
            doc = frappe.parse_json(doc)
        if doc.get("is_return") == 0 :
            create_new_jv_for_new_si(doc)

        elif doc.get("is_return") == 1 :
            create_new_jv_for_return_si(doc)
    except Exception as e:
        frappe.log_error(f"Error creating journal entry: {str(e)}")
        return f"Error creating journal entry: {str(e)}"





@frappe.whitelist()
def tax_free_sales(tax_category = None , taxes_and_charges = None ):
    if tax_category and taxes_and_charges:
        if tax_category == 'معفي' and taxes_and_charges == '0 % - IVY':
            return '50102010001 - المبيعات معفاه من الضريبة - IVY'
    else:
        pass


@frappe.whitelist()
def check_zero_qty_for_items(self):
    items = frappe.get_all("Sales Invoice Item", filters={"parent": self.name})
    for item in items: 
        doc = frappe.get_doc("Sales Invoice Item", item.name)
        bin_data = frappe.db.get_value('Bin', {'item_code': doc.item_code, 'warehouse': "Main Stock - IVY"}, ['actual_qty', 'reserved_stock'])
        actual_qty = bin_data[0] if bin_data else 0
        reserved_stock = bin_data[1] if bin_data else 0
        result = actual_qty - reserved_stock
        if result <= 0:
            frappe.throw(f"Insufficient available quantity for item: {doc.item_code} in row {doc.idx}. Please check.")


def create_new_jv_for_new_si(doc):
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
    return (f"Journal Entries created for{doc.custom_employee_id} in Journal Entry { jv.name }")


def create_new_jv_for_return_si(doc):
    original_jv_rows = frappe.db.sql("""
        SELECT tjea.*
        FROM `tabJournal Entry` tje 
        INNER JOIN `tabJournal Entry Account` tjea ON tjea.parent = tje.name
        WHERE tje.cheque_no = %s 
    """,(doc.get("return_against")) , as_dict = True)
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
    for row in original_jv_rows:
        if row.account == '20101010002 - ذمم موردين دائنة - IVY':
            jv.append("accounts", {
                "account": "20101010002 - ذمم موردين دائنة - IVY",
                "credit_in_account_currency": row.debit_in_account_currency,
                "credit":row.debit,
                "cost_center": jv.cost_center,
                "party_type": "Employee",
                "party": jv.employee_id,
                "party_name": jv.employee_name,
                "user_remark": f"reference type is Sales Invoice, Reference Name is {jv.name} and Reference Due Date is: {doc.get('posting_date')}"
            })
        elif row.account == '10104010002 - مبيعات الموظفين - IVY':
            jv.append("accounts", {
                "account": "10104010002 - مبيعات الموظفين - IVY",
                "debit_in_account_currency":row.credit_in_account_currency,
                "debit": row.credit,
                "cost_center": jv.cost_center,
                "party_type": "Customer",
                "party": jv.customer,
                "party_name":jv.customer_name,
                "user_remark": f"reference type is Sales Invoice, Reference Name is {jv.name} and Reference Due Date is: {doc.get('posting_date')}"
            })
    jv.insert(ignore_permissions=True)
    jv.submit()
    return (f"Journal Entries created for{doc.custom_employee_id} in Journal Entry { jv.name }")