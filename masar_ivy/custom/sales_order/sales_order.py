import frappe

@frappe.whitelist()
def get_reserved_qty(item_code, warehouse):
    reserved_qty = frappe.db.get_value('Bin', {'item_code': item_code, 'warehouse': warehouse}, 'reserved_stock')
    return reserved_qty
