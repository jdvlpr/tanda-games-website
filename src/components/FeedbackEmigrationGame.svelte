<script>
  /**
   * @typedef {Object} Props
   * @property {string} [title]
   * @property {any} version
   * @property {boolean} [expand]
   * @property {any} discordLink
   * @property {any} changelog
   */

  /** @type {Props} */
  let {
    title = "Feedback",
    version,
    expand = $bindable(false),
    discordLink,
    changelog
  } = $props();

    let iconDown = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>`;
    let iconUp = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>`;

    let playerNamesInput = $state(),
        email = $state(),
        autoResponse = $state(false);

    let players =
        $derived(playerNamesInput && playerNamesInput.includes(",")
            ? playerNamesInput
                  .split(",")
                  .map((n) => n.trim())
                  .filter((n) => n !== "")
            : null);
    let ageRanges = [
        "Under 12 years old",
        "12 to 16 years old",
        "16 to 24 years old",
        "24 to 40 years old",
        "40 to 60 years old",
        "Above 60 years old",
    ];

    let files = $state([""]);

    let showClearFirstFile = $state(false);
    function onFileChange(index) {
        if (index !== 0) return;
        showClearFirstFile = true;
    }
</script>

<button
    class="flex gap-2 m-auto btn text-2xl justify-center items-center border-none"
    onclick={() => (expand = !expand)}>{title} {@html expand ? iconUp : iconDown}</button
>

{#if expand}
   <div class="flex flex-col items-center">
        <a href={discordLink} rel="nofollow noopener" target="_blank" class="btn my-2"> Join Discord Server</a>
    
        <form
            target="_blank"
            action="https://formsubmit.co/99157ff313bd346ac1d729cca203b666"
            enctype="multipart/form-data"
            method="POST"
            class="inline-flex flex-wrap items-start justify-start gap-4 mb-8 text-left p-4 bg-neutral-100  dark:bg-neutral-800 rounded-md"
        >
            <p class="w-full mb-4 italic">
                Fill out this form after you've play the game, or if you have a question or comment. All responses are
                optional.
            </p>
    
            <input type="hidden" name="version" value={version} />
    
            <div class="flex flex-col gap-2">
                <label for="game-length" class="text-sm">Version Played</label>
                <select id="game-length" name="selected_version" class="w-fi">
                    <option value="" selected>Select a version</option>
                    <option value="I'm not sure">I'm not sure</option>
                    {#each changelog as { version }}
                        <option value={version}>{version}</option>
                    {/each}
                </select>
            </div>
    
            <div class="flex flex-col gap-2">
                <label for="game-length" class="text-sm">About how long did it take to play the game?</label>
                <select id="game-length" name="length_of_the_game" class="w-fit ">
                    <option value="" selected>Select a time</option>
                    <option value="15 min">15 minutes</option>
                    <option value="30 min">30 minutes</option>
                    <option value="45 min">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1 hour 15 min">1 hour 15 minutes</option>
                    <option value="1 hour 30 min">1 hour 30 minutes</option>
                    <option value="1 hour 45 min">1 hour 45 minutes</option>
                    <option value="2 hours">2 hours</option>
                    <option value="2 hours 15 min">2 hours 15 minutes</option>
                    <option value="2 hours 30 min">2 hours 30 minutes</option>
                    <option value="2 hours 45 min">2 hours 45 minutes</option>
                    <option value="3 hours">3 hours</option>
                    <option value="3+ hours">More than 3 hours</option>
                </select>
            </div>
    
            <div class="basis-full"></div>
    
            <div class="flex flex-col gap-2 flex-1">
                <label for="names-of-players" class="text-sm">Names of players (in turn order, comma separated)</label>
                <input
                    id="names-of-players"
                    class=""
                    type="text"
                    name="names_of_players"
                    placeholder="Player 1, Player 2, Player 3, Player 4"
                    bind:value={playerNamesInput}
                />
                {#if playerNamesInput && !playerNamesInput.includes(",")}
                    <p class="text-sm text-red-400">Separate names of players by comma ( , )</p>
                {/if}
            </div>
    
            <div class="basis-full"></div>
    
            {#if players}
                {#each players as player, index}
                    <div class="w-full flex flex-col gap-2 justify-start items-start mb-4">
                        <p class="text-3xl font-bold">{player}</p>
                        
                        <div class="basis-full"></div>
    
                        <div class="flex items-center">
                            <label class="inline-flex items-center cursor-pointer">
                              <input 
                              type="checkbox" 
                              class="h-5 w-5 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none"
                              id="{player}-entered-destination"
                              name="{player}_entered_destination"
                              >
                              <span class="ml-2">Entered destination</span>
                            </label>
                          </div>

                            

                            <div class="flex flex-col gap-2">
                                <label for="{index}-age" class="text-sm">{player}'s Age</label>
                                <select id="{index}-age" name="{player}'s_age" class="w-fit ">
                                    <option value="">Select an age</option>
                                    {#each ageRanges as value}
                                        <option {value}>{value}</option>
                                    {/each}
                                </select>
                            </div>
    
                            
    
                            <div class="flex flex-col gap-2">
                                <label for="{index}-final-assurance-tokens" class="text-sm"
                                    >Number of assurance tokens at the end of the game</label
                                >
                                <select
                                    id="{index}-final-assurance-tokens"
                                    name="{player}'s_final_number_of_assurance_tokens"
                                    class="w-fit "
                                >
                                    <option value="">Select a number</option>
                                    {#each Array(100) as _, i}
                                        <option value={i}>{i} Assurance {i === 1 ? "Token" : "Tokens"}</option>
                                    {/each}
                                </select>
                            </div>
                    </div>
                {/each}
            {/if}
    
            <div class="flex flex-col gap-2 flex-1">
                <label for="comments" class="">Comments & Questions</label>
                <p class="text-sm italic">
                    What didn't make sense? What would you change about the game? What was your strategy, and did it work as
                    you expected? What were your favorite and least favorite things about the game? Did you have enough or
                    too many tokens?
                </p>
                <textarea
                    id="comments"
                    placeholder="Comments & Questions"
                    name="comments_and_questions"
                    class=""
                    rows="8"
    ></textarea>
            </div>
    
            <div class="basis-full"></div>
    
            <div class="flex flex-col gap-2 flex-1 items-start">
                <p class="text-sm">Attach an image, video, or audio file to help describe your feedback</p>
                {#each files as file, index}
                    <div class="flex flex-wrap gap-2">
                        <input
                            id="file_attachment_{index}"
                            type="file"
                            class="w-full"
                            onchange={() => onFileChange(index)}
                            name="file_attachment_{index}"
                            accept="image/*,video/*,audio/*,.pdf"
                        />
                        {#if showClearFirstFile && index === 0}
                            <button
                                type="button"
                                class="mb-2 text-sm"
                                onclick={() => {
                                    document.getElementById(`file_attachment_0`).value = "";
                                    showClearFirstFile = false;
                                }}>x Clear File</button
                            >
                        {/if}
                        {#if index > 0}
                            <button
                                type="button"
                                class="mb-2 text-sm"
                                onclick={() => {
                                    document.getElementById(`file_attachment_${index}`).value = "";
                                    files.splice(index, 1);
                                    files = files;
                                }}>x Remove File</button
                            >
                        {/if}
                    </div>
                {/each}
                <button
                    type="button"
                    onclick={() => {
                        files.push("");
                        files = files;
                    }}>+ Add File</button
                >
            </div>
    
            <div class="basis-full"></div>
    
            <div class="flex flex-col gap-2 flex-1">
                <label for="name-or-alias" class="text-sm">Your name (if you want public credit)</label>
                <input
                    id="name-or-alias"
                    type="text"
                    name="Your Name or Alias"
                    placeholder="Your Name or Alias"
                    class=""
                />
            </div>
    
            <div class="basis-full"></div>
    
            <div class="flex flex-col gap-2 flex-1">
                <label for="email-address" class="text-sm">Your contact email (if you want a reply)</label>
                <input
                    id="email-address"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    class=""
                    bind:value={email}
                />
            </div>
    
            {#if email}
                <div class="flex justify-center items-center gap-2 w-full">
                    <input
                        type="checkbox"
                        class=""
                        id="wants-autoresponse"
                        name="wants_autoresponse"
                        bind:checked={autoResponse}
                    />
                    <label for="wants-autoresponse">Send a copy of this form to {email}</label>
                </div>
                {#if autoResponse}
                    <input type="hidden" name="_autoresponse" value="Thank you for your feedback!" />
                {/if}
            {/if}
    
            <div class="basis-full"></div>
    
            <button type="submit" class="btn">Send Feedback</button>
        </form>
   </div>
{/if}
