/**
 * @class mw.meilisearchForMediaWiki
 * @singleton
 */
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://192.168.1.36:7700",
  "masterKey"
);

console.debug("test");

mw.meilisearchForMediaWiki = {
  a: "b",
};
