import frappe

@frappe.whitelist()
def get_main_stock_qty(item_code, warehouse):
    bin_data = frappe.db.get_value('Bin', {'item_code': item_code, 'warehouse': warehouse}, ['actual_qty', 'reserved_stock'])
    
    actual_qty = bin_data[0] if bin_data else 0
    reserved_stock = bin_data[1] if bin_data else 0
    
    result = actual_qty - reserved_stock
    
    if result == 0:
        return 0
    else:
        return result
