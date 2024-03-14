import frappe

@frappe.whitelist()
def fetch_party_name(party_type,party):
    if party_type == "Customer":
        party_name = frappe.db.get_value("Customer", party, "customer_name")
        return party_name
    elif party_type == "Supplier":
        party_name = frappe.db.get_value("Supplier", party, "supplier_name")
        return party_name
    elif party_type == "Employee":
        party_name = frappe.db.get_value("Employee", party, "employee_name")
        return party_name
    elif party_type == "Employee":
        party_name = frappe.db.get_value("Shareholder", party, "title")
        return party_name
    else:
        return None


# @frappe.whitelist()
# def fetch_party_name(party):
#     # Fetch party name from the database
#     party_name = frappe.db.get_value("Customer", party, "customer_name")
#     return party_name