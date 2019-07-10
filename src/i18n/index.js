import VueI18n from "vue-i18n";
import { FALLBACK_LANGUAGE, DEFAULT_LANGUAGE } from "@/i18n/constants";
import en from "@/i18n/lang/en.json";
import fr from "@/i18n/lang/fr.json";
import vi from "@/i18n/lang/vi.json";
import ru from "@/i18n/lang/ru.json";

export default function(Vue) {
  Vue.use(VueI18n);

  const browserLocale = navigator.language;
  const locale = browserLocale.includes("-") ? browserLocale.split("-")[0] : browserLocale || DEFAULT_LANGUAGE;

  return new VueI18n({
    locale: locale,
    fallbackLocale: FALLBACK_LANGUAGE,
    messages: { fr, en, vi, ru }
  });
}
