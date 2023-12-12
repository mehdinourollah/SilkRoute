import { createDeployment, createIngress, createService, namespace, patchDeployment } from "@/lib/backend"
import { createConfigMap } from "@/lib/backend/collections/configmaps";
import { createNamespace, getAllNamespaces } from "@/lib/backend/collections/namespaces"
import { TNameSpace } from "@/lib/types";


export const runAll = async () => {

    let uuid = '';

    try {
        const get_namespace_res = await getAllNamespaces()
        if (get_namespace_res?.data.items.length > 0) {
            uuid = get_namespace_res.data.items.find((item: TNameSpace) => item.metadata.name === namespace).metadata.uid;
            localStorage.setItem("uuid", uuid);
        }
    } catch (e) {


        try {
            const cns_res = await createNamespace();
            console.log({ cns_res });

            uuid = cns_res.data.items.find((item: TNameSpace) => item.metadata.name === namespace).metadata.uid;
            localStorage.setItem("uuid", uuid);


        } catch (e) {
            console.log(e);
        }


    }
    setTimeout(async () => {



        try {
            await createService();
        } catch (e) {
            console.log(e);
        }

        try {
            await createConfigMap(uuid);
        } catch (e) {
            console.log(e);
        }

        try {
            await createDeployment();
        } catch (e) {
            console.log(e);
        }

        try {
            await createIngress(uuid);
        } catch (e) {
            console.log(e);
        }

        try {
            await patchDeployment(1);
        } catch (e) {
            console.log(e);
        }



        console.log('Finished!');
    }, 5000);
}