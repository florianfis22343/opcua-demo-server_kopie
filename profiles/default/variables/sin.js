// @see https://github.com/node-opcua/node-opcua/blob/master/documentation/creating_a_server.md
module.exports = {
    run: function (namespace, device, opcua, verbose, serverValues) {
        var name           = 'sin';
        serverValues[name] = 0;
        namespace.addVariable(
            {
                componentOf: device,
                nodeId     : "ns=1;s=" + name,
                browseName : name,
                dataType   : opcua.DataType.Double,
                value      : {
                    get: function () {
                        return new opcua.Variant({dataType: opcua.DataType.Double, value: serverValues[name]});
                    },
                    set: function (variant) {
                        serverValues[name] = parseFloat(variant.value);
                        return opcua.StatusCodes.Good;
                    }
                }
            }
        );

        // Change value every 100ms
        let sinStep = 0;
        setInterval(function () {
            serverValues[name] = Math.sin(Math.PI * 2 * (sinStep / 1000));
            sinStep++;
        }, 100);
    }
};
