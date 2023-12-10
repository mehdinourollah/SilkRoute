import { instance, namespace, zone } from ".."
import md5 from "md5";

export const createIngress = (uuid: string) => {
    const calculatedHash = md5(uuid).slice(0, 8)
    return instance.post(`/${zone}/apis/networking.k8s.io/v1/namespaces/${namespace}/ingresses`, JSON.stringify(
        {
            "apiVersion": "networking.k8s.io/v1",
            "kind": "Ingress",
            "metadata": {
                "name": namespace
            },
            "spec": {
                "ingressClassName": "nginx",
                "rules": [
                    {
                        "host": `${namespace}-${calculatedHash}.${zone}.arvancaas.ir`,
                        "http": {
                            "paths": [
                                {
                                    "path": "/",
                                    "pathType": "Prefix",
                                    "backend": {
                                        "service": {
                                            "name": namespace,
                                            "port": {
                                                "name": "ws"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ))
}

export const deleteIngress = () => {
    return instance.delete(`/${zone}/apis/networking.k8s.io/v1/namespaces/${namespace}/ingresses/silkroute`)
}   