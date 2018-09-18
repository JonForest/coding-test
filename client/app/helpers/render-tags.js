import { helper } from '@ember/component/helper';

export function renderTags([tags, ...params]/*, hash*/) {
  if (!tags.length) return

  return `<span class="tag">${tags.join('</span>, <span class="tag">')}</span>`
}

export default helper(renderTags);
