/* ------------------------------ MOCK DATA ------------------------------ */
const bookings = [
    {
      id: "WIP-567823",
      type: "Monthly",
      location: "Downtown Garage Spot, LA",
      vehicle: "SUV",
      customer: "Franklin B.",
      bookingId: "WIP-567823 - Monthly",
      listingLocation: "Downtown Garage Spot, LA",
      payoutStatus: "Scheduled",
      nextPayoutDate: "Oct 22, 2025",
      recurringBilling: "(Next payment: Oct 14th)",
      recurringBillingDetails: "Billed on the 14th of each month",
      paymentMethod: "Bank Transfer – Ending in 1234",
      monthlyRate: "$500 per month",
      bookingDuration: "Sep 25 – Dec 24 (3 months)",
      progressData: {
        rentStartDate: "Sep 25",
        paymentProcessingDate: "Oct 14",
        payoutScheduledTime: "4–7 days",
        stageProgress: {
          rentInProgress: "completed",
          paymentProcessing: "completed",
          payoutScheduled: "current",
          payoutSent: "pending",
        },
      },
    },
    {
      id: "WIP-789456",
      type: "Weekly",
      location: "Airport Parking Zone, SF",
      vehicle: "Sedan",
      customer: "Sarah M.",
      bookingId: "WIP-789456 - Weekly",
      listingLocation: "Airport Parking Zone, SF",
      payoutStatus: "Processing",
      nextPayoutDate: "Oct 25, 2025",
      recurringBilling: "(Next payment: Oct 18th)",
      recurringBillingDetails: "Billed every Sunday",
      paymentMethod: "Bank Transfer – Ending in 1234",
      monthlyRate: "$200 per week",
      bookingDuration: "Oct 1 – Dec 31 (13 weeks)",
      progressData: {
        rentStartDate: "Oct 1",
        paymentProcessingDate: "Oct 18",
        payoutScheduledTime: "Oct 25",
        stageProgress: {
          rentInProgress: "completed",
          paymentProcessing: "current",
          payoutScheduled: "pending",
          payoutSent: "pending",
        },
      },
    },
    {
      id: "WIP-123789",
      type: "Daily",
      location: "Business District Lot, NYC",
      vehicle: "Truck",
      customer: "Mike R.",
      bookingId: "WIP-123789 - Daily",
      listingLocation: "Business District Lot, NYC",
      payoutStatus: "Sent",
      nextPayoutDate: "Oct 20",
      recurringBilling: "(Next payment: Daily)",
      recurringBillingDetails: "Billed daily at midnight",
      paymentMethod: "Bank Transfer – Ending in 1234",
      monthlyRate: "$45 per day",
      bookingDuration: "Oct 15 – Oct 30 (15 days)",
      progressData: {
        rentStartDate: "Oct 15",
        paymentProcessingDate: "Oct 16",
        payoutScheduledTime: "Oct 18",
        stageProgress: {
          rentInProgress: "completed",
          paymentProcessing: "completed",
          payoutScheduled: "completed",
          payoutSent: "completed",
        },
      },
    },
  ];
  
  /* ------------------------------ HELPERS ------------------------------ */
  const $ = (sel) => document.querySelector(sel);
  
  const Card = (inner) =>
    `<div class="bg-white rounded-2xl shadow-[0_4px_15px_rgba(60,85,73,0.2)] p-6 md:p-6">${inner}</div>`;
  
  const H2 = (txt) =>
    `<h2 class="text-[#3c4855] font-bold text-[28px] leading-none">${txt}</h2>`;
  
  /* ------------------------------ BOOKING SELECTOR ------------------------------ */
  function populateSelector() {
    const sel = $("#bookingSelect");
    sel.innerHTML = bookings
      .map(
        (b) =>
          `<option value="${b.id}">
    #${b.id} – ${b.type} Booking - ${b.location} (${b.vehicle}) – ${b.customer}
    </option>`
      )
      .join("");
    sel.addEventListener("change", () => render(sel.value));
  }
  
  /* ------------------------------ BOOKING OVERVIEW ------------------------------ */
  function renderOverview(b) {
    const badgeClass =
      b.payoutStatus === "Scheduled"
        ? "bg-[#e5f8fc] text-[#0096b6]"
        : b.payoutStatus === "Processing"
        ? "bg-orange-100 text-orange-600"
        : "bg-green-100 text-[#1eb785]";
  
    return Card(`
        ${H2("Booking Overview")}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div class="space-y-2">
            ${labelVal("Booking ID", b.bookingId)}
            ${labelVal("Listing Location", b.listingLocation)}
            ${labelVal(
              "Recurring Billing",
              `${b.recurringBilling}<br/><span class='text-[#838f9c] text-[14px] md:text-[12px]'>${b.recurringBillingDetails}</span>`
            )}
            ${labelVal("Booking Duration", b.bookingDuration)}
          </div>
          <div class="space-y-2">
            <div class="text-[#838f9c] text-[16px] md:text-[14px] font-medium">Payout Status</div>
            <div class="inline-flex items-center px-3 py-2 rounded-md ${badgeClass}">
              <span class="text-[16px] md:text-[14px] font-medium">${
                b.payoutStatus
              }</span>
            </div>
            ${labelVal("Next Payout Date", b.nextPayoutDate)}
            ${labelVal("Payment Method", b.paymentMethod)}
            ${labelVal("Monthly Rate", b.monthlyRate)}
          </div>
        </div>
    
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div class="bg-[#fff7ea] rounded-xl p-6">
            <div class="text-[#3c4855] font-semibold text-[18px] md:text-[16px] mb-1">
              Refundable Deposits <span class="text-[#838f9c]">(charged once)</span>
            </div>
            <ul class="list-disc pl-5 text-[#36414d] text-[16px] md:text-[14px] space-y-1">
              <li>Security Deposit: $25</li>
              <li>Access Device Deposit: $50</li>
            </ul>
            <div class="text-[#838f9c] text-[14px] md:text-[12px] mt-2">
              Note: Host does not earn this. It’s refunded to parker at end.
            </div>
          </div>
    
          <div class="bg-[#f2f4f5] rounded-xl p-6">
            <div class="text-[#3c4855] font-semibold text-[18px] md:text-[16px] mb-3">Earnings</div>
            <div class="flex items-center justify-between text-[16px] md:text-[14px] text-[#36414d]">
              <span>Gross Monthly Amount</span><span>$575</span>
            </div>
            <div class="flex items-center justify-between text-[16px] md:text-[14px] text-[#36414d] border-b border-[#e6e7ea] pb-3">
              <span>Platform Fee (25%)</span><span>− $144</span>
            </div>
            <div class="flex items-center justify-between text-[#1eb785] font-semibold text-[18px] md:text-[16px] pt-3">
              <span>Net Payout</span><span>$431</span>
            </div>
          </div>
        </div>
      `);
  }
  
  function labelVal(label, valHtml) {
    return `
        <div class="text-[#838f9c] text-[16px] md:text-[14px] font-medium">${label}</div>
        <div class="text-[#36414d] text-[18px] md:text-[16px] font-medium leading-6">${valHtml}</div>
      `;
  }
  
  /* ------------------------------ PAYOUT PROGRESS ------------------------------ */
  function renderProgress(b) {
    const s = b.progressData.stageProgress;
  
    const step = (top, bottom, active) => `
        <div class="min-w-[70px] md:min-w-0 flex flex-col items-center">
          <div class="w-[29px] h-[29px] rounded-full flex items-center justify-center ${
            active ? "bg-[#1eb785]" : "bg-[#ced1d4]"
          }">
            ${active ? check() : ""}
          </div>
          <div class="mt-2 text-center font-medium text-[14px] md:text-[16px] ${
            active ? "text-[#1eb785]" : "text-[#9da3aa]"
          }">
            ${top
              .split("\n")
              .map((t) => `<div>${t}</div>`)
              .join("")}
          </div>
          <div class="text-[#9da3aa] text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] mt-1">${bottom}</div>
        </div>
      `;
  
    const line = (on) =>
      `<div class="flex-1 flex items-center"><div class="h-1 w-full rounded-full ${
        on ? "bg-[#1eb785]" : "bg-[#ced1d4]"
      }"></div></div>`;
  
    return Card(`
        ${H2("Payout Progress")}
        <p class="mt-4 text-[16px] md:text-[14px]">
          Track where your current payment is in the payout process—from booking start to funds sent.
        </p>
    
        <div class="mt-6 overflow-x-auto md:overflow-visible no-scrollbar">
          <div class="min-w-[420px] md:min-w-0 w-full flex items-center gap-3 md:gap-5 md:justify-between">
            ${step(
              "Rent In\nProgress",
              b.progressData.rentStartDate,
              s.rentInProgress !== "pending"
            )}
            ${line(s.paymentProcessing !== "pending")}
            ${step(
              "Payment\nProcessing",
              b.progressData.paymentProcessingDate,
              s.paymentProcessing !== "pending"
            )}
            ${line(s.payoutScheduled !== "pending")}
            ${step(
              "Payout\nScheduled",
              b.progressData.payoutScheduledTime,
              s.payoutScheduled !== "pending"
            )}
            ${line(s.payoutSent === "completed")}
            ${step(
              "Payout\nSent",
              s.payoutSent === "completed" ? b.nextPayoutDate : "—",
              s.payoutSent !== "pending"
            )}
          </div>
        </div>
      `);
  }
  
  function check() {
    return `<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M5 10.5 8.2 13.7 15 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }
  
  /* ------------------------------ EARNINGS SUMMARY ------------------------------ */
  function renderEarnings() {
    const cards = [
      { title: "This Month", value: "$1,250.00", color: "text-[#1eb785]" },
      { title: "Pending Payouts", value: "$540.00", color: "text-[#0096b6]" },
      { title: "Total Earnings", value: "$2,485.00", color: "text-[#0f8d5d]" },
    ];
    return Card(`
        ${H2("Earnings and Payout")}
        <p class="mt-4 text-[16px] md:text-[14px]">
          See your monthly earnings, pending amounts, and total payouts across this booking.
        </p>
    
        <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          ${cards
            .map(
              (c) => `
            <div class="rounded-xl border border-[#e6e7ea] p-6 stat-card">
              <div class="text-[#3c4855] font-semibold text-[16px] md:text-[14px]">${c.title}</div>
              <div class="mt-auto font-semibold text-[22px] md:text-[18px] ${c.color}">${c.value}</div>
            </div>`
            )
            .join("")}
        </div>
      `);
  }
  
  /* ------------------------------ BREAKDOWN ------------------------------ */
  function renderMonthlyBreakdown() {
    // Timeline states per month (matches your corrected logic)
    const rows = [
      {
        m: 1,
        billing: "Sep 25, 2025",
        payout: "Sep 28, 2025",
        gross: "$575",
        fee: "$144",
        net: "$431",
        status: badge("Sent", "green"),
        tl: [
          { label: "Booking Start", date: "Sep 25", state: "completed" },
          { label: "Payment Processed", date: "Sep 26", state: "completed" },
          { label: "Payout Scheduled", date: "Sep 27", state: "completed" },
          { label: "Payout Sent", date: "Sep 28", state: "completed" },
        ],
        open: true,
      },
      {
        m: 2,
        billing: "Oct 14, 2025",
        payout: "Oct 16, 2025",
        gross: "$500",
        fee: "$125",
        net: "$375",
        status: badge("Scheduled", "cyan"),
        tl: [
          { label: "Booking Start", date: "Oct 14", state: "completed" },
          { label: "Payment Processed", date: "Oct 14", state: "completed" },
          { label: "Payout Scheduled", date: "Oct 16", state: "current" },
          { label: "Payout Sent", date: "—", state: "pending" },
        ],
        open: false,
      },
      {
        m: 3,
        billing: "Nov 14, 2025",
        payout: "Nov 16, 2025",
        gross: "$500",
        fee: "$125",
        net: "$375",
        status: badge("Upcoming", "gray"),
        tl: [
          { label: "Booking Start", date: "Nov 14", state: "pending" },
          { label: "Payment Processed", date: "Nov 14", state: "pending" },
          { label: "Payout Scheduled", date: "Nov 16", state: "pending" },
          { label: "Payout Sent", date: "—", state: "pending" },
        ],
        open: false,
      },
    ];
  
    const header = `
        <thead class="text-left border-b border-[#eceef0]">
          <tr class="text-[#3c4855] text-[16px] md:text-[14px]">
            <th class="py-3">Billing Cycle</th>
            <th class="py-3">Billing Date</th>
            <th class="py-3">Payout Date</th>
            <th class="py-3 text-right">Gross</th>
            <th class="py-3 text-right">Platform Fee</th>
            <th class="py-3 pr-8 text-right">Net Earnings</th>
            <th class="py-3 pl-6">Status</th>
          </tr>
        </thead>`;
  
    const rowsHtml = rows
      .map((r, i) => {
        const row = `
            <tr class="border-b border-[#eceef0]">
              <td class="py-3">
                <button class="inline-flex items-center gap-2 text-left"
                        onclick="toggleMonth(${i})">
                  <span class="text-[16px] md:text-[14px] font-medium">Month ${
                    r.m
                  }</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                       class="transition-transform ${r.open ? "rotate-180" : ""}"
                       id="arrow-${i}">
                    <path d="M5 7.5 10 12.5 15 7.5" stroke="#717182" stroke-width="1.6"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </td>
              <td class="py-3">${r.billing}</td>
              <td class="py-3">${r.payout}</td>
              <td class="py-3 text-right">${r.gross}</td>
              <td class="py-3 text-right">-${r.fee}</td>
              <td class="py-3 pr-8 text-right text-[#1eb785]">${r.net}</td>
              <td class="py-3 pl-6">${r.status}</td>
            </tr>
            <tr id="expand-${i}" class="${r.open ? "" : "hidden"}">
              <td colspan="7" class="bg-[#f9fafb] py-4">
                <div class="px-2 md:px-4">
                  <div class="flex items-center gap-3 md:gap-5">
                    ${miniTimeline(r.tl)}
                  </div>
                </div>
              </td>
            </tr>
          `;
        return row;
      })
      .join("");
  
    return Card(`
        ${H2("Monthly Payout Breakdown")}
        <div class="mt-6 overflow-x-auto">
          <table class="w-full min-w-[720px]">
            ${header}
            <tbody class="text-[16px] md:text-[14px] text-[#36414d]">
              ${rowsHtml}
            </tbody>
          </table>
        </div>
        <div class="mt-4 bg-[#fff3d2] text-[#cf8500] rounded-md p-3 text-[16px] md:text-[14px]">
          Note: Deposits are included only in the first billing cycle and will be refunded at the end of the booking period.
        </div>
      `);
  }
  
  function toggleMonth(i) {
    const row = document.getElementById(`expand-${i}`);
    const arrow = document.getElementById(`arrow-${i}`);
    row.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  }
  
  function miniTimeline(steps) {
    const dot = (state) => {
      if (state === "current") {
        return `
            <div class="relative">
              <div class="w-[22px] h-[22px] rounded-full bg-white ring-2 ring-[#8edbc2]"></div>
              <div class="absolute inset-[4px] rounded-full bg-[#1eb785]"></div>
            </div>`;
      }
      return `<div class="w-[22px] h-[22px] rounded-full ${
        state === "completed" ? "bg-[#1eb785]" : "bg-[#ced1d4]"
      }"></div>`;
    };
  
    const line = (on) =>
      `<div class="flex-1 flex items-center">
           <div class="h-1 w-full rounded-full ${
             on ? "bg-[#1eb785]" : "bg-[#ced1d4]"
           }"></div>
         </div>`;
  
    return `
        ${stepMini(steps[0])}
        ${line(steps[1].state !== "pending")}
        ${stepMini(steps[1])}
        ${line(steps[2].state !== "pending")}
        ${stepMini(steps[2])}
        ${line(steps[3].state === "completed")}
        ${stepMini(steps[3])}
      `;
  
    function stepMini(s) {
      const color = s.state === "pending" ? "text-[#9da3aa]" : "text-[#1eb785]";
      return `
          <div class="min-w-[100px] flex flex-col items-center">
            ${dot(s.state)}
            <div class="mt-2 text-center font-medium text-[14px] md:text-[16px] ${color}">
              ${s.label}
            </div>
            <div class="text-[#9da3aa] text-[14px] md:text-[16px]">${s.date}</div>
          </div>`;
    }
  }
  
  function badge(text, tone) {
    const map = {
      green: "bg-green-100 text-[#1eb785]",
      cyan: "bg-[#e5f8fc] text-[#0096b6]",
      gray: "bg-gray-200 text-gray-700",
    };
    return `<span class="px-2 py-[6px] rounded-md text-[14px] md:text-[12px] ${
      map[tone] || map.gray
    }">${text}</span>`;
  }
  
  /* ------------------------------ DAILY BREAKDOWN (simple demo) ------------------------------ */
  function renderDailyBreakdown() {
    const rows = [
      {
        day: "Oct 15, 2025",
        payout: "Oct 16, 2025",
        gross: "$45",
        fee: "$11",
        net: "$34",
        status: badge("Sent", "green"),
      },
      {
        day: "Oct 16, 2025",
        payout: "Oct 17, 2025",
        gross: "$45",
        fee: "$11",
        net: "$34",
        status: badge("Sent", "green"),
      },
      {
        day: "Oct 17, 2025",
        payout: "Oct 18, 2025",
        gross: "$45",
        fee: "$11",
        net: "$34",
        status: badge("Sent", "green"),
      },
      {
        day: "Oct 18, 2025",
        payout: "Oct 20, 2025",
        gross: "$45",
        fee: "$11",
        net: "$34",
        status: badge("Scheduled", "cyan"),
      },
    ];
  
    const header = `
        <thead class="text-left border-b border-[#eceef0]">
          <tr class="text-[#3c4855] text-[16px] md:text-[14px]">
            <th class="py-3">Booking Date</th>
            <th class="py-3">Payout Date</th>
            <th class="py-3 text-right">Gross</th>
            <th class="py-3 text-right">Platform Fee</th>
            <th class="py-3 pr-8 text-right">Net Earnings</th>
            <th class="py-3 pl-6">Status</th>
          </tr>
        </thead>`;
  
    const body = rows
      .map(
        (r) => `
          <tr class="border-b border-[#eceef0]">
            <td class="py-3">${r.day}</td>
            <td class="py-3">${r.payout}</td>
            <td class="py-3 text-right">${r.gross}</td>
            <td class="py-3 text-right">-${r.fee}</td>
            <td class="py-3 pr-8 text-right text-[#1eb785]">${r.net}</td>
            <td class="py-3 pl-6">${r.status}</td>
          </tr>`
      )
      .join("");
  
    return Card(`
        ${H2("Daily Payout Breakdown")}
        <div class="mt-6 overflow-x-auto">
          <table class="w-full min-w-[640px]">
            ${header}
            <tbody class="text-[16px] md:text-[14px] text-[#36414d]">
              ${body}
            </tbody>
          </table>
        </div>
        <div class="mt-4 bg-[#fff3d2] text-[#cf8500] rounded-md p-3 text-[16px] md:text-[14px]">
          For daily bookings, payouts are processed individually for each date, typically 1–2 days after the booking.
        </div>
      `);
  }
  
  /* ------------------------------ RENDER ------------------------------ */
  function render(bookingId) {
    const b = bookings.find((x) => x.id === bookingId) || bookings[0];
  
    $("#bookingOverview").innerHTML = renderOverview(b);
    $("#payoutProgress").innerHTML = renderProgress(b);
    $("#earningsSummary").innerHTML = renderEarnings();
    $("#breakdown").innerHTML =
      b.type === "Daily" ? renderDailyBreakdown() : renderMonthlyBreakdown();
  }
  
  /* ------------------------------ INIT ------------------------------ */
  populateSelector();
  $("#bookingSelect").value = bookings[0].id; // default
  render(bookings[0].id);
  
