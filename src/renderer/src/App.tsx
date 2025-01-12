import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectOneSidebar from './components/sidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { Toaster } from './components/ui/toaster'
import { queryClient } from './lib/tanstack-query/client'
import AddPlayer from './pages/add-player'
import Config from './pages/config'
import DroptimizerForm from './pages/droptimizer'
import Home from './pages/home'
import LootTable from './pages/loot-table'
import RaidSessionPage from './pages/raid-session'
import RosterPage from './pages/roster'

import type { JSX } from 'react'
import { RaidSessionDetailsPage } from './pages/raid-session-details'
import Tierset from './pages/tierset'

function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider defaultOpen={true}>
                <BrowserRouter>
                    <ProjectOneSidebar />
                    <SidebarTrigger />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/roster" element={<RosterPage />} />
                        <Route path="/add-player" element={<AddPlayer />} />
                        <Route path="/droptimizer" element={<DroptimizerForm />} />
                        <Route path="/loot-table" element={<LootTable />} />
                        <Route path="/raid-session" element={<RaidSessionPage />} />
                        <Route
                            path="raid-session/:raidSessionId"
                            element={<RaidSessionDetailsPage />}
                        />
                        <Route path="/tierset" element={<Tierset />} />
                        <Route path="/config" element={<Config />} />
                    </Routes>
                </BrowserRouter>
                <Toaster />
            </SidebarProvider>
        </QueryClientProvider>
    )
}

export default App
