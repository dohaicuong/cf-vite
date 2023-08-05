import fs from 'fs/promises'
import path from 'path'

import rootPath from 'app-root-path'

const prisma_migrations_to_d1_migrations = async () => {
  const prismaMigrationPath = path.resolve(rootPath.path, 'prisma/migrations')
  const results = await fs.readdir(prismaMigrationPath, { recursive: true })
  const migrations = results.filter(result => result.includes('migration.sql'))

  const d1MigrationPath = path.resolve(rootPath.path, 'migrations')
  let total = 0
  for (const migration of migrations) {
    const name = `${migration.split('/')[0]}.sql`
    await fs.copyFile(
      `${prismaMigrationPath}/${migration}`,
      `${d1MigrationPath}/${name}`,
    )
    console.log(`success copy ${name}`)
    total++
  }
  console.log(`Done copy ${total} files`)
}

prisma_migrations_to_d1_migrations()
