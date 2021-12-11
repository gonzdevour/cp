cordova.plugins.idfa.getInfo(onSuccess)
    .then(info => {
        if (!info.trackingLimited) {
            return info.idfa || info.aaid;
        } else if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
            return idfaPlugin.requestPermission().then(result => {
                if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
                    return idfaPlugin.getInfo().then(info => {
                        return info.idfa || info.aaid;
                    });
                }
            });
        }
    })
    .then(idfaOrAaid => {
        if (idfaOrAaid) {
          onSuccess(idfaOrAaid);
        }
    });