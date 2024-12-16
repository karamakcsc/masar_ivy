# import frappe 


# @frappe.whitelist()
# def download_statements(download_link):
#     """
#     Download a file from the server using a valid download link.
#     """
#     import os

#     # Ensure `download_link` is sanitized and valid
#     site_path = frappe.local.site
#     file_path = os.path.join(site_path, download_link.lstrip("/"))  # Handle any leading slashes

#     # Check if file exists
#     if not os.path.exists(file_path):
#         frappe.throw(f"File not found: {file_path}")

#     # Read the file content
#     with open(file_path, "rb") as f:
#         content = f.read()

#     # Set response for file download
#     frappe.local.response.filename = os.path.basename(download_link)
#     frappe.local.response.filecontent = content
#     frappe.local.response.type = "download"
	