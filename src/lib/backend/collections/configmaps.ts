import { instance, namespace, zone } from ".."
import { getConfigMap } from "../configMap"

export const createConfigMap = async (uuid: string) => {
    return instance.post(`/${zone}/api/v1/namespaces/${namespace}/configmaps`, JSON.stringify(
        {
            "apiVersion": "v1",
            "kind": "ConfigMap",
            "metadata": {
                "name": "config"
            },
            "data": {
                "config.json": JSON.stringify(getConfigMap(uuid))
            }
        }
    ))
}

export const getAllConfigMaps = async () => {
    return instance.get(`/${zone}/api/v1/namespaces/${namespace}/configmaps`)
}

export const deleteConfigMap = async () => {
    return instance.delete(`/${zone}/api/v1/namespaces/${namespace}/configmaps/config`)
}