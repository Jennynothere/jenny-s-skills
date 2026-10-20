const overview = document.querySelector('#category-overview');
const list = document.querySelector('#skill-categories');
const total = document.querySelector('#skill-total');

function safeExternalLink(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === 'github.com' ? parsed.href : null;
  } catch {
    return null;
  }
}

function renderCategory(category, index) {
  const id = `category-${category.id}`;
  const card = document.createElement('a');
  card.className = 'overview-card';
  card.href = `#${id}`;
  card.innerHTML = `<div class="card-topline"><span class="category-icon" aria-hidden="true">${category.icon}</span><span class="card-index">0${index + 1}</span></div><h3></h3><p></p>`;
  card.querySelector('h3').textContent = category.name;
  card.querySelector('p').textContent = category.summary;
  overview.append(card);

  const section = document.createElement('section');
  section.className = 'skill-category';
  section.id = id;
  section.setAttribute('aria-labelledby', `${id}-title`);
  const title = document.createElement('h3');
  title.className = 'category-title';
  title.id = `${id}-title`;
  title.textContent = category.name;
  const categoryCount = document.createElement('small');
  categoryCount.textContent = `${category.skills.length} SKILLS`;
  title.append(categoryCount);
  const skills = document.createElement('div');
  skills.className = 'skill-grid';

  for (const skill of category.skills) {
    const url = safeExternalLink(skill.url);
    const item = document.createElement(url ? 'a' : 'span');
    item.className = url ? 'skill-link' : 'skill-unlinked';
    if (url) {
      item.href = url;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      item.setAttribute('aria-label', `${skill.name}，在新标签页打开 GitHub 仓库`);
    }
    const name = document.createElement('span');
    name.textContent = skill.name;
    item.append(name);
    if (url) {
      const external = document.createElement('span');
      external.className = 'external-icon';
      external.setAttribute('aria-hidden', 'true');
      external.textContent = '↗';
      item.append(external);
    } else {
      const pending = document.createElement('span');
      pending.className = 'pending-label';
      pending.textContent = '仓库待核实';
      item.append(pending);
    }
    skills.append(item);
  }
  section.append(title, skills);
  list.append(section);
}

async function loadSkills() {
  try {
    const response = await fetch('./skills.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.categories)) throw new Error('技能数据格式不正确');
    let count = 0;
    data.categories.forEach((category, index) => {
      if (!Array.isArray(category.skills)) category.skills = [];
      count += category.skills.length;
      renderCategory(category, index);
    });
    total.textContent = `${count} 项 · ${data.categories.length} 个分类`;
  } catch (error) {
    overview.innerHTML = '';
    list.innerHTML = `<p class="load-error">无法读取技能清单。请使用本地 HTTP 预览，并检查 <code>skills.json</code>：${error.message}</p>`;
  }
}

loadSkills();
