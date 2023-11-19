import * as Tabs from '@radix-ui/react-tabs'

import { Report } from './components/Report'
import { UpdateForm } from './components/UpdateForm'
import styles from './styles.module.css'

export function Configuration() {
  return (
    <main style={{ flex: 1 }} className={styles.containerConfigs}>
      <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
        <Tabs.List className={styles.tabsList}>
          <Tabs.Trigger value="tab1" className={styles.tabsTrigger}>
            Gestão Financeira
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" className={styles.tabsTrigger}>
            Informações Pessoais
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className={styles.tabsContent} value="tab1">
          <Report />
        </Tabs.Content>
        <Tabs.Content className={styles.tabsContent} value="tab2">
          <UpdateForm />
        </Tabs.Content>
      </Tabs.Root>
    </main>
  )
}
