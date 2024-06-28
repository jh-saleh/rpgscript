import { useWindows } from "@/components/hooks/Windows.hook";
import { Window } from "../../window/Window";
import { BasicWindowLayout, SectionLayout, TitleLayout } from "./style";

export const PrivacyPolicy = () => {
    const { windows } = useWindows();
    const { state } = windows["privacypolicy"];
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    return <Window id="privacypolicy">
        <BasicWindowLayout $state={state}>
            <TitleLayout>
                Politique de confidentialité
            </TitleLayout>
            <SectionLayout>
                <p>
                    La présente politique de confidentialité, désignée ci-après la « Politique », expose les pratiques concernant les informations
                    que ce site peut collecter ainsi que leur utilisation.
                </p>
                <h3>
                    Acceptation de la présente politique
                </h3>
                <p>
                    La présente politique s&apos;applique uniquement aux informations collectées sur ce site et ne s&apos;applique pas aux informations collectées à partir d&apos;autres sources.
                    En utilisant ce site, vous acceptez les termes de la présente politique. Si vous refusez les termes de la présente politique, vous devez cesser immédiatement l&apos;utilisation du site.
                </p>
                <h3>
                    Collection d&apos;information
                </h3>
                <p>
                    Ce site ne collecte pas de données personnelles. Ce site n'utilise pas de cookies.
                </p>
                <h3>
                    Responsabilité
                </h3>
                <p>
                    Les informations communiquées sur ce site sont fournies à titre indicatif uniquement. Elles ne sont pas contractuelles et ne sauraient engager la responsabilité de Jean-Hanna SALEH.
                    Les informations présentes sur le site peuvent être modifiées ou mises à jour sans préavis.
                </p>
                <p>
                    La responsabilité de Jean-Hanna SALEH ne saurait être engagée pour :
                </p>
                <p>
                    • Les dommages de toute nature, directs ou indirects, résultant de l&apos;utilisation du site {baseURL} et notamment toute perte d&apos;exploitation, perte financière ou commerciale, perte de programmes et / ou de données en particulier dans le système d&apos;information de l&apos;utilisateur.
                </p>
                <p>
                    • Les dommages de toute nature, directs ou indirects, résultant du contenu et/ou de l&apos;utilisation des sites Internet liés au site {baseURL} ou auxquels les utilisateurs pourraient avoir accès via le site de {baseURL}.
                </p>
                <p>
                    • Les omissions et /ou erreurs que pourraient contenir le site.
                </p>
                <h3>
                    Liens
                </h3>
                <p>
                    Vous pourriez être amené à quitter ce site en cliquant sur certains liens présents.
                    Jean-Hanna SALEH n&apos;assume aucune responsabilité quant aux pratiques de confidentialité exercées par ces autres sites. Il vous est recommandé de lire attentivement leurs politiques de confidentialité.
                </p>
                <h3>
                    Modifications de la présente politique de confidentialité
                </h3>
                <p>
                    La politique de confidentialité peut être mise à jour de temps en temps sans préavis.
                    Il est conseillé de consulter périodiquement cette page pour prendre connaissance de ces modifications.
                    Ces modifications entrent en vigueur immédiatement après leur publication sur cette page.
                </p>
            </SectionLayout>
        </BasicWindowLayout>
    </Window>;
}