import { AppShell, Navbar, Header, Aside, Footer, Grid } from '@mantine/core';
import GridLayout from './components/GridLayout/GridLayout';
import styles from './App.module.scss';

function App() {
   return (
      <AppShell
         padding='md'
         navbar={
            <Navbar width={{ base: 300 }} height={500} p='xs'>
               {/* Navbar content */}
            </Navbar>
         }
         header={<Header height={60} p='xs'></Header>}
         styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
         className={styles['app']}
      >
         <GridLayout />
      </AppShell>
   );
}

export default App;
