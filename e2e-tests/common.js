export const checkLogInOrNot = async(window, expect, userName) => {
  await window.waitForSelector('//*[@id="__next"]/div', '//*[@id="__next"]/div[1]')
  const textVisble = await window.locator('//h1["@aria-label=projects"]', {timeout:3000}).isVisible()
  if (textVisble) {
    const title = await window.textContent('[aria-label=projects]')
    await expect(title).toBe('Projects')

  } else {
    const welcome = await window.textContent('//*[@id="__next"]/div/div[1]/div/h2')
    await expect(welcome).toBe("Welcome!")
    await window.reload()
  }
  return textVisble;
}

export const filterUser = (json, userName) => {
  const filtered = json.filter((item) =>
        item.username.toLowerCase() !== userName.toLowerCase()
      )
    return filtered
  } 

export const commonJson = async(window, userName, packageInfo, fs) => {
  const newpath = await window.evaluate(() => Object.assign({}, window.localStorage))
  const path = require('path');
  const file = path.join(newpath.userPath, packageInfo.name, 'users', 'users.json');
  const data = await fs.readFileSync(file);
  return JSON.parse(data);
}

export const commonFolder = async (window, userName, packageInfo) => {
  const newpath = await window.evaluate(() => Object.assign({}, window.localStorage))
  const path = require('path');
  return path.join(newpath.userPath, packageInfo.name, 'users', userName.toLowerCase())
}

export const commonFile = async (window, packageInfo) => {
  const newpath = await window.evaluate(() => Object.assign({}, window.localStorage))
  const path = require('path');
  return path.join(newpath.userPath, packageInfo.name, 'users', 'users.json');
}

export const removeFolderAndFile = async (fs, folder, userName, json, file) => {
  fs.rmSync(folder, { recursive: true, force: true })
  const filtered = json.filter((item) =>
  item.username.toLowerCase() !== userName.toLowerCase()
)
  return await fs.writeFileSync(file, JSON.stringify(filtered))
}

export const DisplayLogin = async (fs, folder, userName, json, file, window, expect) => {
  await removeFolderAndFile(fs, folder, userName, json, file)
  const welcome = await window.textContent('//*[@id="__next"]/div/div[1]/div/h2')
  await expect(welcome).toBe("Welcome!")
  await window.reload()
}

export const starProject = async(window, expect, projectname) => {
  await expect(window.locator('//*[@id="projects-list"]')).toBeVisible()
  const table = window.locator('//*[@id="projects-list"]')
  const body = table.locator('//*[@id="projects-list-unstar"]')
  const rows = await body.locator('tr')
  for (let i = 0; i < await rows.count(); i++) {
    const row = await rows.nth(i);
    const tds = await row.locator('td');
    if (await tds.nth(1).textContent() === projectname) {
      expect(await tds.first().locator('[aria-label=unstar-project]')).toBeVisible()
      await tds.first().locator('[aria-label=unstar-project]').click()
        expect(await rows.count()).toBe(2)
    }
  }
}

export const unstarProject = async (window, expect, projectname) => {
  await expect(window.locator('//*[@id="projects-list"]')).toBeVisible()
  const table = window.locator('//*[@id="projects-list"]')
  const body = table.locator('//*[@id="projects-list-star"]')
  const rows = await body.locator('tr')
  for (let i = 0; i < await rows.count(); i++) {
    const row = await rows.nth(i);
    const tds = await row.locator('td');
    if (await tds.nth(1).textContent() === projectname) {
      expect(await tds.first().locator('[aria-label=star-project]')).toBeVisible()
      await tds.first().locator('[aria-label=star-project]').click()
      expect(await rows.count()).toBe(0)
    }
  }
}

export const createProjects = async (window, expect, projectname, type, description, abb) => {
  await window.locator('//a[@aria-label="new"]').click()
  await expect(window.locator('//button[@aria-label="open-popover"]')).toBeVisible()
  await window.locator('//button[@aria-label="open-popover"]').click()
  await expect(window.locator(`//a[@data-id="${type}"]`)).toBeVisible()
  await window.locator(`//a[@data-id="${type}"]`).click()
  await expect(window.locator('//input[@id="project_name"]')).toBeVisible()
  await window.locator('//input[@id="project_name"]').fill(projectname)
  await expect(window.locator('//textarea[@id="project_description"]')).toBeVisible()
  await window.locator('//textarea[@id="project_description"]').fill(description)
  await expect(window.locator('//input[@id="version_abbreviated"]')).toBeVisible()
  await window.locator('//input[@id="version_abbreviated"]').fill(abb)
  await expect(window.locator('//button[@aria-label="create"]')).toBeVisible()
  await window.locator('//button[@aria-label="create"]').click()
  const projectName = await window.innerText(`//div[@id="${projectname}"]`)
  expect(projectName).toBe(projectname);
  const title = await window.textContent('[aria-label=projects]');
  expect(title).toBe('Projects');
}