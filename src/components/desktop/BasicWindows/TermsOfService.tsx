import { useWindows } from "@/components/hooks/Windows.hook";
import { Window } from "../../window/Window";
import { BasicWindowLayout, SectionLayout, TitleLayout } from "./style";

export const TermsOfService = () => {
    const { windows } = useWindows();
    const { state } = windows["termsofservice"];
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    return <Window id="termsofservice">
        <BasicWindowLayout $state={state}>
            <TitleLayout>
                Mentions légales
            </TitleLayout>
            <SectionLayout>
                <h3>
                    Édition du site
                </h3>
                <p>
                    Ce site web personnel est édité par <b>Jean-Hanna SALEH</b>. Il est non déclaré à la CNIL car il ne collecte pas d&apos;informations personnelles.
                </p>
                <h3>
                    Hébergement
                </h3>
                <p>
                    <b>Nom de l&apos;hébergeur</b> : Vercel Inc.
                </p>
                <p>
                    <b>Adresse</b> : 340 S Lemon Ave #4133, Walnut, CA 91789
                </p>
                <p>
                    <b>Numéro de téléphone</b> : (559) 288-7060
                </p>
                <p>
                    <b>Adresse e-mail</b> : privacy@vercel.com
                </p>
                <h3>
                    Conditions générales d’utilisation du site
                </h3>
                <p>
                    L’utilisation du site {baseURL} implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites.
                    Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment,
                    les utilisateurs du site {baseURL} sont donc invités à les consulter de manière régulière.
                </p>
                <p>
                    Ce site internet est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par Jean-Hanna SALEH.
                    Le site web {baseURL} est mis à jour régulièrement par Jean-Hanna SALEH. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins
                    à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.
                </p>
                <h3>
                    Limitations de responsabilité
                </h3>
                <p>
                    Le site utilise la technologie JavaScript.
                    Jean-Hanna SALEH ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site {baseURL}.
                    Jean-Hanna SALEH décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur {baseURL}.
                    Jean-Hanna SALEH s’engage à sécuriser au mieux le site {baseURL}, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.
                </p>
                <h3>
                    Gestion des données personnelles
                </h3>
                <p>
                    Le site ne collecte pas de données personnelles.
                    Pour plus d&apos;information, lisez la politique de confidentialité.
                </p>
                <h3>
                    Liens hypertextes et cookies
                </h3>
                <p>
                    Le site {baseURL} contient des liens hypertextes vers d’autres sites.
                    Jean-Hanna SALEH décline toute responsabilité à propos de ces liens externes ou des liens créés par d’autres sites vers {baseURL}.
                </p>
                <p>
                    Le site {baseURL} n'utilise pas de cookies.
                    Un cookie est un petit fichier texte qui peut être envoyé à votre navigateur lorsque vous visitez un site web.
                    Pour plus d&apos;informations, lisez la politique de confidentialité.
                </p>
                <h3>
                    Droit applicable et attribution de juridiction
                </h3>
                <p>
                    Tout litige en relation avec l’utilisation du site {baseURL} est soumis au droit français.
                    En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de PARIS.
                </p>
            </SectionLayout>
        </BasicWindowLayout>
    </Window>;
}