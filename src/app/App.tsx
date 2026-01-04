import React from 'react'
import { Header } from "../widgets/Header";
import cls from "./styles/index.scss";
import {AppRouter} from "./providers/router";

export const App = () => {
  return (
    <div className={cls.container}>
      <Header />
        <div className={cls.content}>
            <AppRouter />
        </div>
    </div>
  )
}

export default App;
