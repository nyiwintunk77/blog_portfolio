import QueryString from "qs";

export function setTitle(param) {
    const {tag, username, searchKeyword} = QueryString.parse(param, {
        ignoreQueryPrefix: true,
    });

    if (searchKeyword) return `'${searchKeyword}'の検索結果`;
    if (username) return `${username}の投稿`;
    if (tag) return `#${tag}`;

    return 'Tomato Blog';
}