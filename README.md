# internal-ip-address
Obtém o ip interno da rede usando window.RTCPeerConnection

    <!DOCTYPE html>
    <html>
        <head>
            <script src="internal-ip-address.js"></script>
            <script>
                window.addEventListener('loadedAddress', function(e) {
                    var ipAddress = e.detail.address;
                    alert(ipAddress);
                });
            </script>
        </head>
        <body>
        </body>
    </html>
