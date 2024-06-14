import socket

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # This IP address is used to get the local IP address. It does not need to be reachable.
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]
    except Exception:
        ip_address = "Unable to get IP address"
    finally:
        s.close()
    return ip_address

if __name__ == "__main__":
    print("IP Address:", get_ip_address())

