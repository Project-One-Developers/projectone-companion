import { zodResolver } from '@hookform/resolvers/zod'
import { queryClient } from '@renderer/lib/tanstack-query/client'
import { queryKeys } from '@renderer/lib/tanstack-query/keys'
import { addPlayer } from '@renderer/lib/tanstack-query/players'
import { newPlayerSchema } from '@shared/schemas/characters.schemas'
import { NewPlayer } from '@shared/types/types'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { Loader2, PlusIcon } from 'lucide-react'
import { useState, type JSX } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from './hooks/use-toast'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

export default function PlayerNewForm(): JSX.Element {
    const [open, setOpen] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: addPlayer,
        onSuccess: (_, arg) => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.players] })
            form.reset()
            setOpen(false)
            toast({
                title: 'Player added',
                description: `The player ${arg} has been successfully added.`
            })
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: `Unable to add the player. Error: ${error.message}`
            })
        }
    })

    const form = useForm<NewPlayer>({
        resolver: zodResolver(newPlayerSchema),
        defaultValues: {
            name: ''
        }
    })

    function onSubmit(values: { name: string }): void {
        mutate(values.name)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="rounded-full bg-primary text-background hover:bg-primary/80 w-10 h-10 flex items-center justify-center cursor-pointer">
                    <PlusIcon
                        className={clsx('w-5 h-5 hover:rotate-45 ease-linear transition-transform')}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New player</DialogTitle>
                    <DialogDescription>
                        Enter only the player's nickname. Characters played should be added later
                        and must be named as they are in the game.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} type="submit">
                            {isPending ? <Loader2 className="animate-spin" /> : 'Add'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
